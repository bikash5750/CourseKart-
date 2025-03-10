import { Course, User } from "../db/schema.model.js";
import  userCheckMiddleware from "../middleware/user.middleware.js";
import { Router } from "express";
import { z } from "zod";

const userrouters = Router();

// Zod schema validation
const userDetailsSchema = z.object({
  username: z.string().min(3, "Username should be at least 3 characters long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)")
});

// Route to create a new user
userrouters.post("/signup", async (req, res) => {
  try {
    const parsedDetails = userDetailsSchema.parse(req.headers);

    const createUser = await User.create({
      username: parsedDetails.username,
      password: parsedDetails.password
    });

    res.json({
      msg: "User created successfully",
      user: createUser
    });

  } catch (error) {
    res.status(500).json({
      msg: "Unable to create user",
      error: error.errors
    });
  }
});

// Route to get all courses
userrouters.get("/courses", async (req, res) => {
  try {
    const response = await Course.find();
    res.json({
      courses: response
    });
  } catch (error) {
    res.status(500).json({ msg: "Unable to fetch courses" });
  }
});

// Route to purchase a specific course
userrouters.post("/purchase-course", userCheckMiddleware, async (req, res) => {
  try {
    const courseId = req.headers.courseid;
    const username = req.headers.username;

    if (!courseId || !username) {
      return res.status(400).json({
        msg: "Enter a valid course ID and username"
      });
    }

    // Update user's purchased courses
    const updateResult = await User.updateOne(
      { username: username }, 
      { $push: { purchasedCourses: courseId } }
    );


    res.json({
      msg: "Course purchased successfully"
    });

  } catch (error) {
    res.status(500).json({
      msg: "Unable to purchase course",
    });
  }
});

// Route to get all purchased courses for a user
userrouters.get("/purchased-courses", async (req, res) => {
  try {
    
    const user = await User.findOne({ username : req.headers.username });

    if (!user) {
      return res.status(404).json({
        msg: "User not found"
      });
    }

    const courses = await Course.find({
      _id: { $in: user.purchasedCourses }
    });

    res.json({
      purchasedCourses: courses
    });

  } catch (error) {
    res.status(500).json({
      msg: "Unable to fetch purchased courses",
      
    });
  }
});

export { userrouters };

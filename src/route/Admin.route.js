import { Admin, Course } from "../db/schema.model.js";
import  {admincheakmiddleware}  from "../middleware/admin.middleware.js";
import { z } from "zod";
import { Router } from "express";
import jwt from "jsonwebtoken"
const adminrouters = Router(); 

//  Zod schema for username and password validation
const admindetailsschema = z.object({
  username: z.string().min(3, "Username should be at least 3 characters long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)")
});

// Signup Route
adminrouters.post("/signup", async (req, res) => {
  try {
    
    // Validate request headers
    const parsedDetails = admindetailsschema.parse(req.headers);

    // Create Admin in the database
    await Admin.create({
      username: parsedDetails.username,
      password: parsedDetails.password
    });

    res.json({ msg: "Admin created successfully" });
  } catch (error) {
    console.log(error)
    
    res.status(500).json({ msg: "Unable to create Admin" });
  }
});


adminrouters.post("/signin" , async (req,res)=>{
  try {
    const parsedDetails = admindetailsschema.parse(req.headers);
    const user =  await Admin.findOne({
      username: parsedDetails.username,
      password: parsedDetails.password
    });

    if(user)
    {
      const token = jwt.sign({username : parsedDetails.username } , process.env.jwtkey)
      res.json({
       token
      })
    }
    else {
      res.status(401).json({ msg: "Invalid credentials" });
    }
   
  } catch (error) {
    res.status(505).json({
      msg : " not validated"
    })
    
  }
})
//  Course Creation Route
adminrouters.post("/courses", admincheakmiddleware, async (req, res) => {
  try {
    const { course_name, course_desc, course_price, course_img } = req.headers;

    const newCourse = await Course.create({ course_name, course_desc, course_price , course_img });

    res.json({ msg: "Course created successfully", course_id: newCourse.id });
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Unable to create Course" });
  }
});

//  Get Course List Route
adminrouters.get("/courseslist", admincheakmiddleware, async (req, res) => {
  try {
    const response = await Course.find(); 
    res.json({ courses: response });
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Unable to fetch courses" });
  }
});

export { adminrouters };
 
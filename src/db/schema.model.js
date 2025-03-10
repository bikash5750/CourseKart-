import mongoose from "mongoose";

//defining schema
const UserSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true,
  },
  password : {
    type : String,
    required :true
  },
  email : {
    type : String,
    required : false,
    unique : true
  },
  purchasedCourses: [
    { type: mongoose.Schema.ObjectId, 
    ref: "Course" 
  }]
})
const AdminSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true,
  },
  password : {
    type : String,
    required :true
  },
  email : {
    type : String,
    required : false,
    unique : true
  },
  courses : [{
    type : mongoose.Schema.ObjectId,
    ref : "Course"
  }]

})
const CourseSchema = new mongoose.Schema({
  course_name : {
    type : String,
    required : true,
  },
  course_desc : {
    type : String,
    required :true
  },
  course_img: { type: String, 
    required: true, 
   
  }, 
  course_price :{
    required : true,
    type : Number,
  }
})

const User = mongoose.model("User" , UserSchema)
const Admin = mongoose.model("Admin" , AdminSchema)
const Course = mongoose.model("Course" , CourseSchema)

export { User, Admin , Course}
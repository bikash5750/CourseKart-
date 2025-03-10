import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

import dotenv from "dotenv"

dotenv.config({
  path: "./.env"
})

console.log(process.env.mongouri)

import { adminrouters } from "./src/route/Admin.route.js";
import { userrouters } from "./src/route/User.route.js"; 
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/admin", adminrouters);
app.use("/user", userrouters); // 

mongoose.connect(process.env.mongouri)
.then(()=>{ console.log("connected to database")})
.catch((err)=>{
  console.error("unable to connext to db" , err)
})

app.listen(3000, () => {
  console.log(`Your application is running on port 3000`);
});

import { Admin } from "../db/schema.model.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({path : "../../.env"})



async function admincheakmiddleware(req,res,next) {
  const typetoken = req.headers.authorization
  const jwtarr = typetoken.split(" ")
  const jwt_token =  jwtarr[1]

  const decode = jwt.verify(jwt_token,process.env.jwtkey)
  if(decode.username)
  {
    req.username =  decode.username
    next()
  }
  else{
    res.json({
      msg : " auth fail"
    })
  }
  
}

//defining middlware
//async coz finding takes time
//without jwt
// async function admincheakmiddleware(req,res,next)
// {
//   const username = req.headers.username;
//   const password = req.headers.password;
//   const email = req.headers.email

//   const responce =  await Admin.findOne({username,password,email})
//   if(responce)
//   {
//     next();
//   }
//   else{
//     return res.status(403).json({ msg: "Admin not found" });
//   }

// }

export {admincheakmiddleware};
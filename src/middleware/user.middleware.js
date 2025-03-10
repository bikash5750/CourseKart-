import { User } from "../db/schema.model.js";
import dotenv from "dotenv"
dotenv.config({path : "../../.env"})

async function usercheakmiddleware(req,res,next) {
  const typetoken = req.headers.authorization
  const jwtarr = typetoken.split(" ")
  const jwt_token =  jwtarr[1]

  const decode = jwt_token.verify(jwt_token,process.env.jwtkey)
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


// async function usercheakmiddleware(req,res,next)
// {
//   const username = req.headers.username
//   const password = req.headers.password


//   const responce = await User.findOne({username,password})
//   if(responce)
//   {
//     next();
//   }
//   else{
//     return res.status(403).json({ msg: "User not found" });
//   }
// }

export default usercheakmiddleware;
import jwt from "jsonwebtoken"
import getEnv from "../utils/env.js";

// Middleware shoudl verify user sign up data eg email, password, etc
export const verifyUserSignupData = (req, res, next) => {
  const { email, password, userName } = req.body;

  if (!email || !password || !userName) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  next(); 
};

import Users from "../db/models/user.js";
import { sendResStatus } from "../utils/responseMessage.js";

export const verifyUserExists = async (req, res, next) => {
  const { email } = req.body;
    
  try {
    const existingUser = await Users.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists." }); // Conflict
    }

    next(); // user չկա՝ OK, անցնում ենք
  } catch (error) {
    res.status(500).json({ error: "Error checking user existence." });
  }
};

export const checkSignInData = async(req, res, next) => {
  const {email, password} = req.body;
 
  if(!email || !password){
    return res.status(400).json({error: "Bad request"});
  }

  next();
}

export function verifyToken(req , res, next) {
  try {
    console.log("verify token middleware")
    const token = req.headers.authorization;

    console.log(token)

    if(!token) return sendResStatus(res , 401)

    jwt.verify(token.split(" ")[1], getEnv("JWT_ACCESS_SECRET") , (err , user) => {
      if(err) {
        console.log(err.message)
        return sendResStatus(res , 401)
      }

      req.userID = user.id

      next()
    })
  } catch(e) {
    console.log(e.message)
  }
} 

// export const checkRecord = async(req, res, next) => {
//   const{sound, scent, texture, visual, staff} = req.body;

//   if(sound == null || scent == null || texture == null || visual == null || staff == null){
//     return res.status(400).json({error: "All 5 must be provided"})
// } 

// next();
// }

/*

{
    "email": "test@test.com",
    "userName": "test",
    "password": "Test111!"
}
*/
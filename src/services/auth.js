import Users from '../db/models/user.js';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import getEnv from "../utils/env.js"

export async function signupService(userData) {
  const {userName , email , password} = userData

  console.log(userData)
    const saltCount = 8
    const hashedPassword = await bcrypt.hash(password , saltCount)
    console.log("password hashed")

    await Users.create({
      username: userName,
      email,
      password: hashedPassword
    })
}

export async function signinService(credentials) {
  const {email , password} = credentials

  

  const user = await Users.findOne({where: {email}})

  if(!user) throw new Error("User not found")

  const decoded = await bcrypt.compare(password, user.password)

  if(!decoded) throw new Error("Invalid email or password")

  const accessToken = jwt.sign({id: user.id}, getEnv("JWT_ACCESS_SECRET") , {
    expiresIn: 120
  })

  const refreshToken = jwt.sign({id: user.id}, getEnv("JWT_REFRESH_SECRET"), {
    expiresIn: "7d"
  })
  const userName = user.username
  console.log(userName);
  return {
    accessToken,
    refreshToken,
    userName
    }
}

function generateRefreshTokenAsync(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getEnv("JWT_REFRESH_SECRET") , (err , user) => {
      if(err) reject(err)

      const accessToken = jwt.sign({id: user.id}, getEnv("JWT_ACCESS_SECRET") , {
        expiresIn: "1h"
      })

      resolve(accessToken)
    })
  })
} 

export async function refreshTokenService(token) {
  return await generateRefreshTokenAsync(token)
} 



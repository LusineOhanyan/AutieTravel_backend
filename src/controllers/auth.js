import {signupService, signinService , refreshTokenService} from "../services/auth.js"
import {sendResStatus, sendResponseBody} from "../utils/responseMessage.js"

export async function signup(req , res) {
  try {
    await signupService(req.body);

    sendResponseBody(res, 201, "User signed up successfully");

  } catch (error) {
    console.log("Error in sign up controller")
    sendResponseBody(res, 500, "Internal server error");

  }
}

export async function signin(req , res) {
  try {
    const {email , password} = req.body

    const {accessToken , refreshToken, userName} = await signinService({email , password})

    return res.status(200).json({accessToken , refreshToken, userName});
  } catch(e) {
    sendResponseBody(res, 500, "Internal server error");

  }
}


export async function refreshToken(req, res){
  try{
    const {token} = req.body
    
    if (!token) {
      // return res.status(400).json({ error: "Refresh token is required" });
      sendResponseBody(res, 400, "error: Refresh token is required" )
      return ;
    } 
    const refreshToken = await refreshTokenService(token)

    // return res.status(200).json({refreshToken});
    return sendResponseBody(res, 200, "New refresh token generated", { refreshToken});
  } catch(e) {
    sendResponseBody(res, 500, "Internal server error");
  }
}
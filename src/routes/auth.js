import express from "express";
import {signup , signin, refreshToken} from "../controllers/auth.js";
import { verifyUserSignupData, verifyUserExists , checkSignInData} from "../middlewares/auth.js";
const router = express.Router();

router.post( "/signup", [verifyUserSignupData, verifyUserExists], signup);
router.post("/signin", [checkSignInData], signin);
router.post("/refresh-token", refreshToken);


export default router;

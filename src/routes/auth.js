import express from "express";
import AuthController from "../controllers/auth";

const router = express.Router();

router.post(
  "/signup",
  [verifyUserSignupData, verifyUserExists],
  AuthController.signup
);

export default router;

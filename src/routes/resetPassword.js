import { Router } from "express"
import {resetPasswordController} from "../controllers/resetPassword.js"

const router = Router();

router.patch("/", resetPasswordController);

export default router;
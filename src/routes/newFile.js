import express from "express";
import { getStatesWithHotelsController } from "../controllers/newFile.js";

const router = express.Router();

router.get("/", getStatesWithHotelsController);

export default router;
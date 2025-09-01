import express from "express";
import { getStatesWithHotelsController } from "../controllers/getStatesWithHotels.js";

const router = express.Router();

router.get("/", getStatesWithHotelsController);

export default router;
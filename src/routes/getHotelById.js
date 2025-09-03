import { getHotelByIDController } from "../controllers/getHotelById.js";
import express from "express";

const router = express.Router();

router.get("/hotel", getHotelByIDController);

export default router;
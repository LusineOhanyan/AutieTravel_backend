import { getHotelByIDController } from "../controllers/getHotelById.js";
import express from "express";

const router = express.Router();

router.get("/:id", getHotelByIDController);

export default router;
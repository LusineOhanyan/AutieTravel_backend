import express from "express"
import { getHotelsController } from "../controllers/getHotels.js"

const router = express.Router()

router.get("/", getHotelsController);

export default router;
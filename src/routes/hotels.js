import express from "express"
import { indexController } from "../controllers/hotels.js"

const router = express.Router()

router.get("/" , indexController);

export default router
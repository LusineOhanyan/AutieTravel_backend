import express from "express"
import ping from "../controllers/ping.js"

const router = express.Router()

router.get("/" , ping)

export default router
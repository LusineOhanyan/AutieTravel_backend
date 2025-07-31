import express from "express"
import { createReviewsController } from "../controllers/reviews.js"

const router = express.Router()

router.post('/', createReviewsController);

export default router;
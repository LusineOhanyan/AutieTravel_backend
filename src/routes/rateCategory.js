import { getAllCategoriesController } from "../controllers/rateCategory.js";
import express, { Router } from "express"


const router = express.Router()


router.get("/", getAllCategoriesController);

export default router;
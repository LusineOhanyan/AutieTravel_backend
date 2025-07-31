import ping from "./ping.js"
import auth from "./auth.js"
import hotels from "./hotels.js"
// import RateCategory from "../routes/rateCategory.js"
import express from "express"
import reviews from "./reviews.js"
import { verifyToken } from "../middlewares/auth.js"

const configureRouter = (app) => {
    const router = express.Router()

    app.use("/ping" , ping)
    app.use("/auth" , auth)

    app.use(verifyToken)

    // protected routes
    app.use("/hotels", hotels)
    // app.use("/rate-categories", RateCategory)
    app.use("/reviews", reviews)
}

export default configureRouter
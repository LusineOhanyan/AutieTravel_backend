import ping from "./ping.js"
import auth from "./auth.js"
import hotels from "./hotels.js"
import statesWithHotels from "./getStatesWithHotels.js"
import getHotels from "./getHotels.js"
// import RateCategory from "../routes/rateCategory.js"
import express from "express"
import reviews from "./reviews.js"
import { verifyToken } from "../middlewares/auth.js"
import getHotelById from "./getHotelById.js"
import  resetPassword  from "./resetPassword.js"


const configureRouter = (app) => {
    const router = express.Router()

    app.use("/ping" , ping)
    app.use("/auth" , auth)

    // app.use(verifyToken)

    // protected routes
    // app.use("/hotels", hotels)
    app.use("/reviews", reviews)
    app.use("/states-with-hotels", statesWithHotels)
    app.use("/hotels", getHotels)
    app.use("/", getHotelById)
    app.use("/reset-password", resetPassword)

}

export default configureRouter
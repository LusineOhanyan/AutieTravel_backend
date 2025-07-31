import { sendResStatus } from "../utils/responseMessage.js";
import {createReviews} from "../services/reviews.js"

export const createReviewsController = async (req, res) => {
    try{
        const userID = { req }
        await createReviews({...req.body , userID})
        sendResStatus(res, 201, "Review created successfully")
    }catch(e){
        sendResStatus(res, 400, "Something went wrong");
    }
}

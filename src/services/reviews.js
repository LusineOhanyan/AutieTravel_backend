import Rates from "../db/models/rates.js";
import Reviews from "../db/models/reviews.js";

export const createReviews = async({userId, hotelId, comment , ratesOptions}) => {
    try{
        const newReview = await Reviews.create({
             userID: userId,
             hotelID: hotelId,
             comment: comment 
        });

        const { reviewID } = newReview;

        const rates = ratesOptions.map((rateOption) => {
            const [criteriaID , value] = Object.entries(rateOption)

            return {
                reviewID,
                criteriaID,
                value,
            }
        })

        await Rates.bulkCreate(rates)
    }catch(error){
        console.error("Error")
    }
}
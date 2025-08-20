import Amadeus from "amadeus";
import "dotenv/config";
import { Result } from "pg";

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

export const getHotelsByCity = async (cityCode) => {
  try {
    const res = await amadeus.referenceData.locations.hotels.byCity.get({
      cityCode
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching hotels by city:", err.message);
    throw err;
  }
};

export const getCityCode = async (keyword) => {
  try {
    const res = await amadeus.referenceData.locations.get({
      keyword, 
      subType: "CITY"
    });

    return res.data[0]?.iataCode; 
  } catch (err) {
    // console.error("Error fetching city code:", err.result.errors);
    console.error("Error fetching city code:", err);

    throw err;
  }
};

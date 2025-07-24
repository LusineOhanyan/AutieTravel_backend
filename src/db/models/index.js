import Users from "./user.js";
import Reviews from "./review.js";
import Hotel from "./hotel.js";
import RateCategory from "./rateCategory.js";

const associateModels = () => {
  Users.hasMany(Reviews, { foreignKey: "userID" });
  Reviews.belongsTo(Users, { foreignKey: "userID" });

  Hotel.hasMany(Reviews, { foreignKey: "hotelID" });
  Reviews.belongsTo(Hotel, { foreignKey: "hotelID" });

  RateCategory.hasMany(Reviews, { foreignKey: "rateCategoryID" });
  Reviews.belongsTo(RateCategory, { foreignKey: "rateCategoryID" });
};

export default associateModels;

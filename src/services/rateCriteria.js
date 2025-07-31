
// import RateCategory from "../models/rateCategory.js";

import RateCriteria from "../db/models/rateCriteria.js";
export async function getAllCategories() {
  try {
    const categories = await RateCriteria.findAll();
    return categories;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
}

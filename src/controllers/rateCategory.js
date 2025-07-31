import { getAllCategories } from "../services/rateCriteria.js";
import { sendResponseBody } from "../utils/responseMessage.js";

export async function getAllCategoriesController(req, res) {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    // res.status(500).json({ error: error.message });
    return sendResponseBody(res, 500, error.message);
  }
}


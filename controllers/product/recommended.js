// Import your Product model using ES modules
import { Product } from "../../models/product.js";

export const recommendedProduct = async (req, res) => {
  try {
    const { category, productId } = req.body;

    const recommendations = await Product.find({
      _id: { $ne: productId },
      category: category
    }).limit(2)

    // If recommendations are found, return them
    if (recommendations.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Recommended products found",
        recommendations
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No recommendations found for this category"
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later."
    });
  }
};

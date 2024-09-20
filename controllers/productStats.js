import { Product } from "../models/product.js";

export const productStats = async (req,res) => {
  try {
    const { products } = req.body;

    // Update the status of each product
    for (const product of products) {
      await Product.findByIdAndUpdate(product.id, { status: product.status });
    }

    res.status(200).json({ message: "Product status updated to pending" });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error while product details",
    });
  }
};

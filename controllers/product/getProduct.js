import { Product } from "../../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().limit(8);
    if (!products) {
      return res.json({
        success: false,
        message: "Can't found products",
      });
    }
    return res.json({
        success: true,
        message: "Fetched all products",
        data:products
      });


  } catch (error) {
    return res.json({
      success: false,
      message: "Error while get products",
    });
  }
};

import { Product } from "../../models/product.js";

export const createProduct = async (req, res) => {
  try {
    const {
      productName,
      category,
      costPrice,
      sellPrice,
      stock,
      description,
      productImages,
    } = req.body;

    if (productName == 0) {
      return res.json({
        success: false,
        message: "Product name is required",
      });
    } else if (category == 0) {
    } else if (costPrice == 0) {
    } else if (sellPrice == 0) {
    } else if (stock == 0) {
    } else if (description == 0) {
    } 
    
    else if (productImages == 0) {
    }

    const createProduct = await Product.create({
      productName,
      category,
      costPrice,
      sellPrice,
      stock,
      description,
      productImages
    });

    const product = await Product.findById({_id:createProduct._id})
    if(!product){
        return res.json({
            success: false,
            message: "Can't found product",
          });
    }

    return res.json({
        success: true,
        message: "Successfully created product",
        data:product
      });



  } catch (error) {
    return res.json({
      success: false,
      message: "Error while create product",
    });
  }
};

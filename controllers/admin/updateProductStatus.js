import { Payment } from "../../models/payment.js";

export const updateProductStatus = async (req, res) => {
  const { productId, newStatus } = req.body;
  const updatedProduct = await Payment.findByIdAndUpdate(productId,{ status: newStatus },{ new: true } // Return the updated document
);

  if (!updatedProduct) {
    return res.json({
      success: false,
      message: "Product not found",
    });
  }

  return res.json({
    success: true,
    message: "Product status updated successfully",
    data: updatedProduct,
  });
};

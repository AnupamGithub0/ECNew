import { Payment } from "../../models/payment.js";

export const paymentOwner = async (req, res) => {
  try {
    const { payments } = req.body;

    if (!payments || !Array.isArray(payments)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment data",
      });
    }

    const createdPayments = await Payment.insertMany(
      payments.map((payment) => ({
        productName: payment.productName,
        productImage: payment.productImage,
        price: payment.price,
        totalPay: payment.totalPay,
        paymentMethod: payment.paymentMethod,
        quantity:payment.quantity,
        owner: req.user,
      }))
    );

    console.log("Payments Saved: ", createdPayments);

    return res.json({
      success: true,
      message: "Payments successfully created",
      data: createdPayments,
    });
  } catch (error) {
    console.error("Error while processing payments: ", error);
    return res.status(500).json({
      success: false,
      message: "Error while processing payments",
      error: error.message,
    });
  }
};

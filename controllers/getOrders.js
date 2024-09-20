import { Payment } from "../models/payment.js"

export const getOrdersByOwner = async (req, res) => {
    try {
        const { id } = req.params;
        
        const orders = await Payment.find({ owner: id }).sort({ createdAt: -1 });
        return res.json({
            success: true,
            message: "Successfully fetched orders for the owner",
            data: orders
        });
    } catch (error) {
        return res.json({
            success: false,
            message: "Error while fetching orders",
        });
    }
}

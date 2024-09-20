import { Payment } from "../../models/payment.js"

export const ProductStatus = async(req,res)=>{
    try {
        const userData = await Payment.find().populate({
            path: 'owner', 
            select: '-profileImage'
          }).select("-profileImage")

        return res.json({
            success:true,
            message:"Successfully user get",
            data:userData
        })
        
    } catch (error) {
        return res.json({
            success:false,
            message:"Error while product status"
        })
        
    }
}
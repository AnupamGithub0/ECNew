import { Product } from "../models/product.js"

export const searchProduct = async (req,res)=>{
    const query = req.query.productName || ""
    const products = await Product.find({productName:{$regex:query,$options: 'i'}})
    
    
    return res.json({
        success:true,
        message:"Successfully searched",
        data:products
    })
}
import { Product } from "../../models/product.js"

export const getAllProductByCategory = async(req,res)=>{
    try {
        const {category} = req.params

        const product = await Product.find({category})
        if (!product) {
            return res.json({
                success:false,
                message:"Can't get product by category"
            })    
        }

        return res.json({
            success:true,
            message:"Successfully got products",
            data:product
        })
        
    } catch (error) {
        return res.json({
            success:false,
            message:"Error while get all products by category"
        })
        
    }
}
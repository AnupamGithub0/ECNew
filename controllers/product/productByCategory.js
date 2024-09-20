import { Product } from "../../models/product.js"

export const productByCategory = async(req,res)=>{
    try {
        const products = await Product.distinct("category")
        const productCategory = []

        for (const category of products) {
            const findProduct = await Product.findOne({category})
            if (findProduct) {
                productCategory.push(findProduct)
            }
            
        }
        return res.status(200).json({
            success:true,
            message:"Fetch all products by category",
            data:productCategory
        })
        
        
    } catch (error) {
        return res.json({
            success:false,
            message:"Error while product by category"
        })
        
    }
}
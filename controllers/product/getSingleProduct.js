import { Product } from "../../models/product.js"

export const singleProduct = async(req,res)=>{
    try {
        const {productId} = req.params

        const product = await Product.findById({_id:productId})
        if (!product) {
            return res.json({
                success:false,
                message:"Can't found product"
            })  
        }
        return res.json({
            success:true,
            message:"Successfull got the product",
            data:product
        }) 
    } catch (error) {
        return res.json({
            success:false,
            message:"Error while get single product"
        })
        
    }
}
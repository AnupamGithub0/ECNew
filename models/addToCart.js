import mongoose from 'mongoose'
const addToCartSchema = mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productImage:{
        type:String,
        required:true 
    },
    price:{
        type:String,
        required:true  
    },
    quantity:{
        type:String,
        required:true  
    },
    totalPay:{
        type:String,
        required:true  
    }

})

export const AddToCart = mongoose.model("AddToCart",addToCartSchema)
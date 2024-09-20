import mongoose from 'mongoose'
const productSchema = mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    costPrice:{
        type:String,
        required:true
    },
    sellPrice:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    productImages:{
        type:Array,
        required:true
    }

})

export const Product = mongoose.model("Product",productSchema)
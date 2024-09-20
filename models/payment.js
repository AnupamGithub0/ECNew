import mongoose from 'mongoose'

const paymentSchema = mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productImage:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    totalPay:{
        type:Number,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true

    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User" 
    },
    status: {
        type: String,
        enum: ['Pending', 'Cancelled', 'Successful'],
        default: 'Pending'
      }

},{timestamps: true });
export const Payment = mongoose.model("Payment",paymentSchema)
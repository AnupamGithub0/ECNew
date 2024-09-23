import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true 
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        trim: true,   
        lowercase: true 
    },
    password: {
        type: String,
        required: true,
        minlength: 6 
    },
    profileImage: {
        type: String,
        default: "" 
    },
    role: {
        type: Number,
        default: 0
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

export const User = mongoose.model("User", userSchema);

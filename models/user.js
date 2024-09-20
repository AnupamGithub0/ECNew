import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true // Removes any leading/trailing whitespace
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures that each email is unique
        trim: true,   // Removes any leading/trailing whitespace
        lowercase: true // Converts the email to lowercase
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Ensures a minimum length for the password
    },
    profileImage: {
        type: String,
        default: "" // Optional, sets a default value
    },
    role: {
        type: Number,
        default: 0
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

export const User = mongoose.model("User", userSchema);

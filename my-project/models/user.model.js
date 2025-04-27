    import { Schema, model } from "mongoose";

    const userSchema = new Schema(
    {
        email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        },
        username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        },
        password: {
        type: String,
        required: true,
        },
        confirmPassword: {
        type: String,
        required: true,
        },
        role: {
        type: String,
        enum: ["user", "admin", "manager"],
        },
        firstName: {
        type: String,
        required: true,
        },
        lastName: {
        type: String,
        required: true,
        },
    
    },
    { timestamps: true }
    );

    export const User = model("User", userSchema);
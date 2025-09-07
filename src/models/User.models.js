import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["user", "FoodPartner"],
            required: true,
        },

        accessToken: {
            type: String,
        },

        refreshToken: {
            type: String,
        },

        orderHistory:{
            type:[mongoose.Schema.Types.ObjectId],
            ref:"Order"
        }
    },
    {
        timestamps: true
    })

export const User = mongoose.model("User", userSchema)
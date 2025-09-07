import mongoose from "mongoose"
import { Schema } from "mongoose"


const orderSchema = new Schema(
    {
        orderFoodPartner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoodPartner",

        },

        orderValue: {
            type: Number,
            required: true,
        },

        orderOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        orderItems: [
            {
                type: String,
                required: true,
            },
    ],

        orderQuantity: {
            type: Number,
            required: true
        },
        
        orderStatus:{
            type:String,
            enum:["pending", "confirmed", "delivered", "cancelled"],
            default:"pending",
        }
    },
    {
        timestamps: true
    })


export const Order = mongoose.model("Order", orderSchema) 
import mongoose from "mongoose"
import { Schema } from "mongoose"


const foodPartnerSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    foodVideos: {
        type: [{
            videoUrl: {
                type: String
            },
            caption: String,
            required: true,
        }]
    },

    restaurentName:{
        type:String,
        required:true,
    },

    address:{
        type:String,
        required:true,
    }
},
    {
        timestamps: true
    })



export const FoodPartner = mongoose.model("FoodPartner", foodPartnerSchema)
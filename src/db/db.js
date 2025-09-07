import mongoose from "mongoose"

const connectDB = async(req, res)=>{
    try {
        
        const connectionDB = await mongoose.connect(process.env.MONGODB_URI)
        console.log("CONNECTED TO THE DATABASE ESTABLISHED SUCCESSFULLY !!")

    } catch (error) {
        console.log("ERROR WHILE CONNECTIONG TO THE DATABASE !!")
    }
}


export default connectDB
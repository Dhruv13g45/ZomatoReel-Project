import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError"
import { User } from "../models/user.models"

const verifyJWT = async(req, res, next)=>{
    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new ApiError(401, "Didn't provide the access token !!")
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        const user = await User.findById(decoded?._id)

        if (!user){
            throw new ApiError(404, "User not found error logging out !!")
        }

        req.user = user
        next()
    } catch (error) {
        console.log(error)
    }
}


export {verifyJWT}
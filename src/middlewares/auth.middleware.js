import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"

const verifyJWT = async(req, _, next)=>{
    const authCookie = req.cookies

    if(!authCookie) {
        throw new ApiError(401, "Didn't provide the access token !!")
    }


    try {
        const decoded = jwt.verify(authCookie?.accessToken, process.env.JWT_ACCESS_TOKEN_SECRET)
        const user = await User.findById(decoded.userId)

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
import jwt from "jsonwebtoken"

const generateRefreshAccessToken = (user)=>{

    const userPayload = {
        userId : user?._id,
        userEmail: user?.email,
    }

    const accessToken = jwt.sign(
        userPayload,
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY}
    )

    const refreshToken = jwt.sign(
        userPayload,
        process.env.JWT_REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY}
    )

    return {accessToken, refreshToken}
}

export {generateRefreshAccessToken}
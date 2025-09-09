import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiSuccess } from "../utils/ApiSuccess.js"
import { checkPassword } from "../utils/checkPassword.js"
import { encryptPassword } from "../utils/encryptPassword.js"
import { generateRefreshAccessToken } from "../utils/generateRefreshAccessToken.js"


const registerUser = async(req,res) =>{
    const {fullName, email, password, role} = req.body

    if (!fullName && !email && !password && !role){
        throw new ApiError(401, "All fields are compulsory !!")
    }

    const existingUser = await User.findOne({email: email})

    if (existingUser){
        throw new ApiError(403, "User with specififed email already exists !!")
    }


    const hashedPassword = await encryptPassword(password)



    const createdUser = await User.create({
        fullName,
        email,
        password:hashedPassword,
        role,
        orderHistory:[],
    })

    if (!createdUser){
        throw new ApiError(500, "Something went wrong while creating a user !!")
    }

    return res.status(200)
    .json(
        new ApiSuccess(200, "User created Successfully !!", {userId: createdUser._id,fullName:createdUser.fullName})
    )

}


const loginUser = async(req, res)=>{
    const {email, password} = req.body

    if (!email || !password){
        throw new ApiError(401, "All fields are compulsory !!")
    }

    const existingUser = await User.findOne({email: email})

    if (!existingUser){
        throw new ApiError(404, "User not found")
    }

    const isPasswordCorrect = await checkPassword(existingUser, password)
    
    if (!isPasswordCorrect){
        throw new ApiError(301, "Password entered was incorrect !!")
    }

    const {accessToken, refreshToken} = generateRefreshAccessToken(existingUser)

    const options = {
        httpOnly: true,
        secure: false,
    }

    existingUser.accessToken = accessToken
    existingUser.refreshToken = refreshToken

    existingUser.save()

    res.cookie("accessToken", accessToken, options)
    req.user = existingUser

    return res.status(200)
    .json(
        new ApiSuccess(200, "User loggedIn successfully !!", {accessToken})
    )

}


const logoutUser = async(req,res)=>{
    const user = req.user

    user.refreshToken = null
    await user.save()
    res.clearCookie("refreshToken")

    return res.status(200)
    .json(
        new ApiSuccess(200, "User logged out successfully !!", {user})
    )
}


const viewUserProfile = async(req,res) =>{
    const currentUser = await User.findById(req.user?._id)

    if (!currentUser){
        throw new ApiError(404, "Couldn't fetch user details !!")
    }

    return res.status(200)
    .json(
        new ApiSuccess(200, "Fetched user details successfully !!", {currentUser})
    )
}


export {
    registerUser,
    loginUser,
    logoutUser,
    viewUserProfile,
}
import { FoodPartner } from "../models/foodPartner.models.js"
import { User } from "../models/user.models.js"
import { encryptPassword } from "../utils/encryptPassword.js"
import { checkPassword } from "../utils/checkPassword.js"
import { generateRefreshAccessToken } from "../utils/generateRefreshAccessToken.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiSuccess } from "../utils/ApiSuccess.js"
import { uploadToCloudinary } from "../utils/cloudinary.js"
import { v4 as uuidv4 } from "uuid"

const registerPartner = async (req, res) => {

    const { fullName, email, password, role, restaurentName, address } = req.body

    if (!fullName && !email && !password && !role && !restaurentName && address) {
        throw new ApiError(401, "All fields are compulsory !!")
    }

    const existingUser = await User.findOne({ email: email })

    if (existingUser) {
        throw new ApiError(403, "Partner with specififed email already exists !!")
    }


    const hashedPassword = await encryptPassword(password)


    const createdUser = await User.create({
        fullName,
        email,
        password: hashedPassword,
        role,
    })

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating a user !!")
    }

    const createdFoodPartner = await FoodPartner.create({
        user: createdUser?._id,
        foodVideos: [],
        restaurentName,
        address
    })

    if (!createdFoodPartner) {
        throw new ApiError(500, "Something went wrong while creating a partner !!")
    }



    return res.status(200)
        .json(
            new ApiSuccess(200, "User created Successfully !!", { createdFoodPartner })
        )

}


const loginFoodPartner = async (req, res) => {
    const { email, password } = req.body

    if (!email && !password) {
        throw new ApiError(401, "All fields are compulsory !!")
    }

    const existingUser = await User.findOne({ email: email })

    if (!existingUser) {
        throw new ApiError(404, "User not found")
    }

    const isPasswordCorrect = await checkPassword(existingUser, password)

    if (!isPasswordCorrect) {
        throw new ApiError(301, "Password entered was incorrect !!")
    }

    const { accessToken, refreshToken } = generateRefreshAccessToken(existingUser)

    const options = {
        httpOnly: true,
        secure: false,
    }

    existingUser.accessToken = accessToken
    existingUser.refreshToken = refreshToken

    await existingUser.save()

    const foodPartner = await FoodPartner.findOne({ user: existingUser?._id })

    res.cookie("accessToken", accessToken, options)
    req.user = foodPartner

    return res.status(200)
        .json(
            new ApiSuccess(200, "Partner loggedIn successfully !!", { foodPartner })
        )

}


const logoutFoodPartner = async (req, res) => {
    const foodPartner = req.user

    try {
        await User.findByIdAndUpdate(foodPartner.user, { refreshToken: null })
        res.clearCookie("accessToken")
    } catch (error) {
        console.log("Unable to logout the food partner")
    }



    return res.status(200)
        .json(
            new ApiSuccess(200, "Food Partner logged out successfully !!", { foodPartner })
        )
}

const viewFoodPartnerProfile = async (req, res) => {
    const currentUser = req.user

    if (!currentUser) {
        throw new ApiError(500, "Error while fetching partner details !!")
    }

    return res.status(200)
        .json(200, "Fetched partner deatils successfully !!", { currentUser })
}

const createFoodVideo = async (req, res) => {
    const videoFileLocalPath = req.file?.path
    const body = { ...req.body };  
console.log("Parsed body:", body);

const { caption, title } = body;

    if (!videoFileLocalPath && !caption && !title) {
        throw new ApiError(401, "All fields are required !!")
    }



    const fileUrl = await uploadToCloudinary(videoFileLocalPath);

    const currentUser = await FoodPartner.findOne({ user: req.user._id });

    if (!currentUser) {
        return res.status(404).json({ error: "User not found" });
    }


    const customId = uuidv4()

    if (!currentUser.foodVideos) {
        currentUser.foodVideos = [];
    }

    console.log(req.body);
    

    currentUser.foodVideos.push({
        videoUrl: fileUrl,
        videoId: customId,
        caption:caption,
        title:title,
    });


    await currentUser.save()
    console.log(currentUser)


    return res.status(200).json(
        JSON.parse(JSON.stringify(new ApiSuccess(200, "done", { user: currentUser })))
    );


}

const deleteFoodVideo = async (req, res) => {
    const currentUser = req.user
    const videoId = req.params

    if (!currentUser) {
        throw new ApiError(404, "Unable to find current user please login")
    }

    await currentUser.FoodVideos.remove({ videoId, videoId })

    await currentUser.save()

    return res.status(200)
        .json(
            new ApiSuccess(200, "Video deleted successfully !!", { currentUser })
        )


}

export {
    registerPartner,
    loginFoodPartner,
    logoutFoodPartner,
    viewFoodPartnerProfile,
    createFoodVideo,
    deleteFoodVideo,
}
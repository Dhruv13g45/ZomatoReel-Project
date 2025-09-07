import bcrypt from "bcrypt"
import { ApiError } from "./ApiError"


const checkPassword = async(dataModel, userPassword)=>{
    if (userPassword.trim() === ""){
        throw new ApiError(300, "Password cannot be empty !!")
    }

    const storedHashPassword = await dataModel.password;

    const isMatch = await bcrypt.compare(userPassword,storedHashPassword)

    return isMatch

}


export {checkPassword}
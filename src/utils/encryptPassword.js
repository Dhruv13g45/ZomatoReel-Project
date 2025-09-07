import bcrypt from "bcrypt"
import { ApiError } from "./ApiError"

const encryptPassword = async(password)=>{

    if (password.trim() === "" || !password){
        throw new ApiError(404, "Password cannot be empty and need to be entered !!")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    return hashPassword
}

export {encryptPassword}
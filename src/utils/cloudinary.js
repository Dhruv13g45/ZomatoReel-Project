import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadToCloudinary = async(userFileLocalPath)=>{
    const file = await cloudinary.uploader.upload(userFileLocalPath, {
        resource_type:"auto",
    })

    const filePublicUrl = file?.url
    console.log("File has been uploaded succesfully !!")

    return filePublicUrl
}


export {uploadToCloudinary}
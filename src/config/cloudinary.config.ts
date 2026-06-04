/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary} from "cloudinary";
import { envVars } from "./env";
import AppError from "../utils/errorHelpers/AppError";
import httpStatusCodes from "http-status-codes";

cloudinary.config({
  cloud_name: envVars.CLOUDINARY_CLOUD_NAME,
  api_key: envVars.CLOUDINARY_API_KEY,
  api_secret: envVars.CLOUDINARY_API_SECRET,
});


export const deleteImageFromCloudinary = async(url: string) => {
  
  try {
    const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;
    const match = url.match(regex);
    
    if(match && match[1]){
      const public_id = match[1];
      await cloudinary.uploader.destroy(public_id);
      console.log(`File ${public_id} deleted from the cloudinary`)
    }

  } catch (error: any) {
    throw new AppError(httpStatusCodes.INTERNAL_SERVER_ERROR, "Image deletion from cloudinary failed.", error.message)
  }
}

export default cloudinary;
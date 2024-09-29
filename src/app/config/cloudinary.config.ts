import {  v2 as cloudinary } from "cloudinary";
import config from ".";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export const cloudinaryUpload = cloudinary;
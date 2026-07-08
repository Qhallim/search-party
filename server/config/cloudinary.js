import dotenv from "dotenv";
import fs from "fs";
import os from "os";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export async function uploadToCloudinary(file) {
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary environment variables are not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your server .env file."
    );
  }

  const safeName = (file.originalname || "upload").replace(/\s+/g, "-");
  const tempFilePath = path.join(os.tmpdir(), `${Date.now()}-${safeName}`);

  fs.writeFileSync(tempFilePath, file.buffer);

  try {
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: "search-party",
      resource_type: "image",
    });

    return result.secure_url;
  } finally {
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  }
}

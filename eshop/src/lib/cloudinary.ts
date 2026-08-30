import { v2 as cloudinary } from "cloudinary";

let configured = false;

function ensureConfigured() {
  if (configured) return;

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary environment variables are required to upload images.");
  }

  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
  configured = true;
}

export const createCloudinarySignature = () => {
  ensureConfigured();
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request({ timestamp }, process.env.CLOUDINARY_API_SECRET!);
  return { timestamp, signature, cloudName: process.env.CLOUDINARY_CLOUD_NAME };
};

export const uploadImage = async (imageData: string) => {
  ensureConfigured();
  const result = await cloudinary.uploader.upload(imageData, {
    folder: "fitgear/products",
  });
  return result.secure_url;
};

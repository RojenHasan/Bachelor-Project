const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");

async function routeUploader(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "products",
      width: 500,
      height: 500,
      crop: "fill",
    });

    return {
      success: true,
      message: "Uploaded!",
      data: result,
    };
  } catch (error) {
    console.error("Error while uploading image:", error.message);
    return {
      success: false,
      message: "Failed to upload image",
    };
  }
}

module.exports = { routeUploader };

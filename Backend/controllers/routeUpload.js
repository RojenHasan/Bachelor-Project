const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");

//  router.post('/upload', upload.single('image'), function (req, res) {
//   cloudinary.uploader.upload(req.file.path, function (err, result){
//     if(err) {
//       console.log(err);
//       return res.status(500).json({
//         success: false,
//         message: "Error"
//       })
//     }

//     res.status(200).json({
//       success: true,
//       message:"Uploaded!",
//       data: result
//     })
//   })
// });

// module.exports = router;

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

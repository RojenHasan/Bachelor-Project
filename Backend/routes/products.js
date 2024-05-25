const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController");
const upload = require("../middleware/multer");

const cloudinary = require("../utils/cloudinary");

router.post("/", upload.single("image"), productController.createProduct);
router.get("/", productController.getAllProduct);
router.get("/:id", productController.getProduct);
router.get("/search/:key", productController.searchProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;

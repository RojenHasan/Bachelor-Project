const router = require("express").Router();
const productController = require("../controllers/productsController");
const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Specify the filename
  },
});

const upload = multer({ storage: storage });

// Route for creating a new product with file upload
router.post("/", upload.single("image"), productController.createProduct);

router.get("/", productController.getAllProduct);
router.get("/:id", productController.getProduct);
router.get("/search/:key", productController.searchProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;

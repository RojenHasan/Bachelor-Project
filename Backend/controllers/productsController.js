const Product = require("../models/products");
const cloudinary = require("../helper/imageUpload");

module.exports = {
  createProduct: async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const { title, price, description } = req.body;
    try {
      let imageUrl = ""; // Default empty image URL

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "products", // You can specify a folder in Cloudinary to organize your images
          width: 500,
          height: 500,
          crop: "fill",
        });
        imageUrl = result.url; // Store the Cloudinary URL of the image
      }

      const newProduct = new Product({
        title,
        price,
        description,
        image: imageUrl, // Use the uploaded image URL if available, otherwise empty string
      });

      await newProduct.save();
      res.status(200).json("Product created successfully");
    } catch (error) {
      console.error("Error while creating product:", error.message);
      res.status(500).json("Failed to create the product");
    }
  },

  getAllProduct: async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json("failed to get the products");
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json("failed to get the product");
    }
  },
  searchProduct: async (req, res) => {
    try {
      const result = await Product.aggregate([
        {
          $search: {
            index: "furniture",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json("failed to get the productjjs");
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json("Product not found");
      }
      res.status(200).json("Product deleted successfully");
    } catch (error) {
      res.status(500).json("Failed to delete the product");
    }
  },
};

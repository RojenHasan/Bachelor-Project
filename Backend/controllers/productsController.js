const Product = require("../models/products");
const { routeUploader } = require("./routeUpload");
module.exports = {
  // createProduct: async (req, res) => {
  //   const { title, price, image, description } = req.body;

  //   try {
  //     if (image) {
  //       const uploadedResponse = await cloudinary.uploader.upload(image, {
  //         upload_preset: "onlineShop",
  //       });

  //       if (uploadedResponse) {
  //         const product = new Product({
  //           title,
  //           price,
  //           image: uploadedResponse,
  //           description,
  //         });

  //         const savedProduct = await product.save();
  //         res.status(200).send(savedProduct);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send(error);
  //   }
  // },

  // createProduct: async (req, res) => {
  //   const { title, price,image, description } = req.body;
  //   try {
  //     let image = "";

  //     if (req.file) {
  //       const result = await cloudinary.uploader.upload(req.file.path, {
  //         folder: "products",
  //         width: 500,
  //         height: 500,
  //         crop: "fill",
  //       });
  //       image = result.url;
  //     }

  //     const newProduct = new Product({
  //       title,
  //       price,
  //       image,
  //       description,
  //       //category,
  //     });

  //     await newProduct.save();
  //     res.status(200).json("Product created successfully");
  //   } catch (error) {
  //     console.error("Error while creating product:", error.message);
  //     res.status(500).json("Failed to create the product");
  //   }
  // },

  createProduct: async (req, res) => {
    const { title, price, description } = req.body;
    try {
      let image = "";

      if (req.file) {
        // Call routeUploader to upload image
        const uploadResult = await routeUploader(req.file.path);
        if (!uploadResult.success) {
          return res
            .status(500)
            .json({ success: false, message: "Failed to upload image" });
        }
        image = uploadResult.data.url;
      }

      const newProduct = new Product({
        title,
        price,
        image,
        description,
      });

      await newProduct.save();
      res
        .status(200)
        .json({ success: true, message: "Product created successfully" });
    } catch (error) {
      console.error("Error while creating product:", error.message);
      res
        .status(500)
        .json({ success: false, message: "Failed to create the product" });
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

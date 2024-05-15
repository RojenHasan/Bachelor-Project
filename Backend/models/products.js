const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    // category: {
    //   type: String,
    //   enum: ["furniture", "car", "house", "clothe"],
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

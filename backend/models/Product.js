const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(
  {
    numericId: { type: Number, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

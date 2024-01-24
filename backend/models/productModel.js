const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product requires a name"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    required: [true, "Product requires a price"],
  },
  image: {
    type: String,
    required: [true, "Product must have an image"],
  },
  serving: {
    type: Number,
    required: [true, "Product must have a serving size"],
  },
  category: {
    type: String,
    required: [true, "Product must belong to a category"],
    enum: ["main dish", "dessert", "side", "beverage", "appetizer"],
  },
  nutrition: {
    calories: {
      type: Number,
      required: [true, "Product must have calories"],
    },
    protein: {
      type: Number,
      required: [true, "Product must have a proteins value"],
    },
    carbs: {
      type: Number,
      required: [true, "Product must have a carbs value"],
    },
    fats: {
      type: Number,
      required: [true, "Product must have a fats value"],
    },
  },
  description: {
    type: String,
    required: [true, "Product must have a description"],
  },
  rating: {
    type: Number,
    default: 0,
    max: [5, "Rating must be below 5"],
  },
  orderCount: {
    type: Number,
    default: 0,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

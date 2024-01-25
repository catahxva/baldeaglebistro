const mongoose = require("mongoose");
const Product = require("./productModel");

const orderSchema = new mongoose.Schema(
  {
    timeStamp: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: "Pending",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
        productQuantity: {
          type: Number,
          required: true,
        },
      },
    ],
    address: {
      email: {
        type: String,
        required: [true, "Email address is required"],
      },
      name: {
        type: String,
        required: [true, "Name is required"],
      },
      phone: {
        type: String,
        required: [true, "Phone number is required"],
      },
      street: {
        type: String,
        required: [true, "Street name is required"],
      },
      streetNumber: {
        type: String,
        required: [true, "Street number is required"],
      },
      carrier: {
        type: String,
        required: [true, "Delivery type is required"],
      },
    },
    total: {
      type: Number,
      required: [true, "Order requires a total"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "products.productId",
    select: "name price image serving category nutrition available",
  });

  next();
});

orderSchema.post("save", function () {
  const products = this.products;

  products.forEach(async (product) => {
    const productDB = await Product.findById(product.productId);

    if (!productDB) return;

    productDB.orderCount++;

    productDB.save({ validateBeforeSave: false });
  });
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

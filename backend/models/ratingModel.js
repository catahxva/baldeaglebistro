const mongoose = require("mongoose");
const Product = require("./productModel");

const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true],
    },
    // user: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "User",
    //   required: [true, "A rating must belong to an user"],
    // },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "A rating must be given to a product"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ratingSchema.statics.calcAverageRating = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "$product",
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      rating: stats[0].avgRating,
    });
  }
};

ratingSchema.post("save", function () {
  this.constructor.calcAverageRating(this.product);
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;

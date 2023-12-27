const Rating = require("../models/ratingModel");
const sendError = require("../utils/sendError");

exports.verifyExistingRating = async function (req, res, next) {
  try {
    const rating = await Rating.find({
      user: req.user,
      product: req.body.id,
    });

    if (rating.length > 0) {
      return sendError(
        res,
        400,
        "You have already posted a rating for this product"
      );
    }

    next();
  } catch (err) {
    sendError(res, 400, "There has been an error. Please try again later!");
  }
};

exports.createRating = async function (req, res, next) {
  try {
    await Rating.create({
      rating: req.body.rating,
      product: req.body.id,
      user: req.user.id,
    });

    res.status(201).json({
      status: "success",
      message:
        "Your rating has been uploaded successfully and it will be posted soon!",
    });
  } catch (err) {
    console.log(err);
    sendError(
      res,
      400,
      "There has been an error with posting your rating. Please try again later",
      err
    );
  }
};

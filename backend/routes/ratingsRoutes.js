const express = require("express");

const authController = require("../controllers/authController");
const ratingsController = require("../controllers/ratingsController");

const router = express.Router();

router.post(
  "/create-rating",
  // authController.protect,
  // ratingsController.verifyExistingRating,
  ratingsController.createRating
);

module.exports = router;

const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/change-address",
  authController.protect,
  authController.updateUserAddress
);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/verify-account", authController.verifyEmail);
router.post("/reset", authController.protect, authController.resetPassword);
router.post("/forgot", authController.forgotPassword);
router.post("/forgot-reset", authController.resetForgotPassword);

module.exports = router;

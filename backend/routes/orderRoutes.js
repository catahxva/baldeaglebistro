const express = require("express");

const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.protect, orderController.getAllOrders);
router.get("/all", authController.protect, orderController.getAllOrders);

router.get("/one-order/:id", orderController.getOrder);

router
  .route("/update-order/:id")
  .post(
    authController.protect,
    authController.protectRole,
    orderController.updateOrder
  );

router.post(
  `/create-payment`,
  authController.isLoggedIn,
  orderController.createPaymentIntent
);

module.exports = router;

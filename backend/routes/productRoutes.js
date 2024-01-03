const express = require("express");

const productsController = require("../controllers/productController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/cart-items").post(productsController.obtainCartProducts);

router.route("/one-product/:id").get(productsController.getProduct);

router.route("/get-filters/:category?").get(productsController.getFilters);

router
  .route("/delete-product/:id")
  .delete(
    authController.protect,
    authController.protectRole,
    productsController.deleteProduct
  );

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(
    authController.protect,
    authController.protectRole,
    productsController.createProduct
  );

module.exports = router;

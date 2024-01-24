const express = require("express");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const productsController = require("../controllers/productController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/cart-items").post(productsController.obtainCartProducts);

router.route("/one-product/:id").get(productsController.getProduct);

router.route("/get-filters/:category?").get(productsController.getFilters);

router
  .route("/update-product/:id")
  .post(
    authController.protect,
    authController.protectRole,
    productsController.updateProduct
  );

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
    upload.single("file"),
    authController.protect,
    authController.protectRole,
    productsController.createProduct
  );

module.exports = router;

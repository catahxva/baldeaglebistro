const { createFilters, createSort } = require("../utils/APIFeatures");
const Product = require("../models/productModel");
const sendError = require("../utils/sendError");

exports.getAllProducts = async function (req, res, next) {
  try {
    const filters = createFilters(req.query);
    const sortCriteria = createSort(req.query);

    let limit = 8;

    if (req.query.limit) limit = req.query.limit;

    const products = await Product.find(filters)
      .sort(sortCriteria)
      .limit(limit);

    if (products.length <= 0 || !products) {
      return sendError(res, 404, "No products found for your query");
    }

    res.status(200).json({
      status: "success",
      data: {
        data: products,
      },
    });
  } catch (err) {
    sendError(res, 400, "There was an error with getting the data");
  }
};

exports.getProduct = async function (req, res, next) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return sendError(res, 404, "Could not find this product");
    }

    res.status(200).json({
      status: "success",
      data: {
        data: product,
      },
    });
  } catch (err) {
    sendError(res, 400, "There was an error with getting the data");
  }
};

exports.obtainCartProducts = async function (req, res, next) {
  try {
    const cartItems = req.body.products;

    const cartPromises = cartItems.map(async (item) => {
      try {
        const foundItem = await Product.findById(item.id);

        if (!foundItem) {
          return {
            notFound: true,
            itemId: item.id,
          };
        }

        if (!foundItem.available) {
          return {
            notAvailable: true,
            itemId: item.id,
          };
        }

        return foundItem;
      } catch (err) {
        return {
          error: true,
          itemId: item.id,
        };
      }
    });

    const cartItemsDB = await Promise.all(cartPromises);

    const finalCartItems = cartItemsDB.map((cartItem, i) => {
      if (
        cartItem.notFound === true ||
        cartItem.notAvailable === true ||
        cartItem.error === true
      ) {
        return cartItem;
      }

      const price = cartItem.price * cartItems[i].quantity;

      return {
        id: cartItem.id,
        name: cartItem.name,
        category: cartItem.category,
        quantity: cartItems[i].quantity,
        serving: cartItem.serving,
        price,
        image: cartItem.image,
      };
    });

    res.status(200).json({
      status: "success",
      data: {
        data: finalCartItems,
      },
    });
  } catch (err) {
    sendError(res, 400, "There was an error with getting your cart data");
  }
};

exports.createProduct = async function (req, res, next) {
  try {
    const newProduct = await Product.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: newProduct,
      },
    });
  } catch (err) {
    sendError(res, 400, "There was a problem with creating your product");
  }
};

exports.deleteProduct = async function (req, res, next) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return sendError(res, 404, "No product found with this ID");
    }

    res.status(204).json({
      status: "success",
      message: "Product was deleted successfully",
    });
  } catch (err) {
    sendError(res, 400, "There has been an error with performing this action");
  }
};

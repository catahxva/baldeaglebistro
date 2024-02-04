const {
  createFilters,
  createSort,
  createPagination,
} = require("../utils/APIFeatures");
const { itemsFromDB } = require("../utils/itemsFromDB");
const Product = require("../models/productModel");
const sendError = require("../utils/sendError");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dgwygf5i3",
  api_key: "116492218238529",
  api_secret: "ygk_brRvWEc8dS2X1lKwwZN0f8M",
  secure: true,
});

exports.getAllProducts = async function (req, res, next) {
  try {
    const filters = createFilters(req.query);
    const sortCriteria = createSort(req.query);
    const [skip, limit] = createPagination(req.query);

    const [totalProducts, products] = await Promise.all([
      Product.countDocuments(filters),
      Product.find(filters)
        .sort(sortCriteria)
        .skip(skip)
        .limit(limit)
        .select({
          _id: 1,
          name: 1,
          price: 1,
          image: 1,
          serving: 1,
          category: 1,
          nutrition: { calories: 1 },
          available: 1,
        })
        .lean(),
    ]);

    const maxPages = Math.ceil(totalProducts / limit);

    if (!products) {
      return sendError(
        res,
        404,
        "There was a problem with getting the products"
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        data: products,
        totalProducts,
        maxPages,
      },
    });
  } catch (err) {
    sendError(res, 400, "There was an error with getting the data");
  }
};

exports.getFilters = async function (req, res, next) {
  try {
    const { category } = req.params;

    const categoryValues = await Product.distinct("category");

    const { maxPrice, minPrice } = (
      await Product.aggregate([
        {
          $group: {
            _id: null,
            maxPrice: { $max: "$price" },
            minPrice: { $min: "$price" },
          },
        },
      ])
    )[0];

    let data;

    if (!category) {
      data = {
        data: { categoryValues, maxPrice, minPrice },
      };
    }

    if (category) {
      data = {
        data: {
          maxPrice,
          minPrice,
        },
      };
    }

    res.status(200).json({
      status: "success",
      data,
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

    const cartItemsDB = await itemsFromDB(cartItems, Product);

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
    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);

    const newProduct = await Product.create({
      name: req.body.name,
      price: Number(req.body.price),
      image: cloudinaryResult.url,
      serving: Number(req.body.serving),
      category: req.body.category,
      nutrition: {
        calories: Number(req.body.calories),
        protein: Number(req.body.protein),
        carbs: Number(req.body.carbs),
        fats: Number(req.body.fats),
      },
      description: req.body.description,
      available: req.body.availability === "true" ? true : false,
    });

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

exports.updateProduct = async function (req, res, next) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return sendError(res, 404, "No product found with this ID");
    }

    if (req.body.availability === "available") product.available = true;

    if (req.body.availability === "unavailable") product.available = false;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Product was updated successfully!",
      data: {
        data: product.available,
      },
    });
  } catch (err) {
    sendError(res, 400, "There was a problem with updating this product");
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

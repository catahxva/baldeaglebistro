const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const stripe = require("stripe")(
  `sk_test_51OOl2QJARixY9PYyhHDU37eMphdq2DFnNj0N6UZA7HPVZ5Wvt34D9aYrVQ8smzlOOmtwUvOb0FpVfh7ERbtYvzrl008q7hGqRi`
);
const sendError = require("../utils/sendError");
const sendEmail = require("../utils/email");
const emailTemplate = require("../utils/emailTemplate");

exports.createPaymentIntent = async function (req, res, next) {
  try {
    const { shipping: deliveryAddress, products } = req.body;

    if (
      !deliveryAddress ||
      !deliveryAddress.email ||
      !deliveryAddress.name ||
      !deliveryAddress.phone ||
      !deliveryAddress.street ||
      !deliveryAddress.streetNumber ||
      !deliveryAddress.carrier
    ) {
      return sendError(
        res,
        400,
        "The delivery address which you have provided is invalid. You will be redirected to the previous page."
      );
    }

    if (!products || products.length <= 0) {
      return sendError(
        res,
        400,
        "You have no products inside your cart. You will be redirected to another page."
      );
    }

    const itemsPromises = products.map(async (product) => {
      try {
        const itemDB = await Product.findById(product.id);

        if (!itemDB) {
          return {
            notFound: true,
            itemId: product.id,
          };
        }

        if (!itemDB.available) {
          return {
            notAvailable: true,
            itemId: product.id,
          };
        }

        return itemDB;
      } catch (err) {
        return {
          error: true,
          itemId: item.id,
        };
      }
    });

    const itemsDB = await Promise.all(itemsPromises);

    const availableItems = itemsDB.filter((item) => {
      return (
        item.notFound === undefined ||
        item.notAvailable === undefined ||
        item.error === undefined
      );
    });

    const finalPaymentItems = availableItems.map((item, index) => {
      const quant = products[index].quantity;

      const price = item.price * quant;

      return {
        productId: item.id,
        productQuantity: quant,
        price,
      };
    });

    let deliveryPrice;

    if (deliveryAddress.carrier === "deliveryStandard") deliveryPrice = 5;
    if (deliveryAddress.carrier === "deliveryExpress") deliveryPrice = 10;

    const total =
      finalPaymentItems.reduce((acc, current) => {
        return acc + current.price;
      }, 0) + deliveryPrice;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        carrier: deliveryAddress.carrier,
        email: deliveryAddress.email,
      },
      shipping: {
        name: deliveryAddress.name,
        address: {
          line1: `${deliveryAddress.street}, ${deliveryAddress.streetNumber}`,
        },
        phone: deliveryAddress.phone,
      },
    });

    const newOrder = await Order.create({
      user: req.user?.id,
      products: finalPaymentItems,
      address: deliveryAddress,
      total,
    });

    const preheaderText = "Order confirmation";
    const message =
      "Your order has been registered and we are going to deliver it to you as soon as possible. Click on the button below to see your order!";
    const ctaText = "See order";
    const ctaLink = ``;

    const emailHTML = emailTemplate(preheaderText, message, ctaText, ctaLink);

    await sendEmail({
      email: deliveryAddress.email,
      subject: "Order confirmation",
      emailHTML,
    });

    res.status(200).json({
      status: "success",
      clientSecret: paymentIntent.client_secret,
      totalAmount: total,
    });
  } catch (err) {
    sendError(res, 400, "Could not generate payment, please try again later");
  }
};

exports.getAllOrders = async function (req, res, next) {
  try {
    const orders = await Order.find();

    if (!orders || orders.length <= 0) {
      return sendError(res, 404, "No orders found");
    }

    res.status(200).json({
      status: "success",
      data: {
        data: orders,
      },
    });
  } catch (err) {
    sendError(
      res,
      400,
      "There has been an error with getting your data. Please try again later."
    );
  }
};

exports.getOrders = async function (req, res, next) {
  try {
    const orders = await Order.find({
      user: req.user.id,
    });

    if (!orders) {
      return sendError(res, 404, "No orders found for this user.");
    }

    res.status(200).json({
      status: "success",
      data: {
        data: orders,
      },
    });
  } catch (err) {
    sendError(
      res,
      400,
      "There has been an error with getting your data. Please try again later."
    );
  }
};

exports.getOrder = async function (req, res, next) {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return sendError(res, 404, "There was no order found with this ID.");
    }

    res.status(200).json({
      status: "success",
      data: {
        data: order,
      },
    });
  } catch (err) {
    sendError(
      res,
      400,
      "There has been an error with getting your data. Please try again later."
    );
  }
};

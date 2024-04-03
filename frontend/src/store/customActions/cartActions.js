import { cartActions } from "../slices/cartSlice";
import { uiActions } from "../slices/uiSlice";

import { baseUrl } from "../../util/requests";

export const addProductToCart = function (id, quantity) {
  return async function (dispatch) {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        message: "Pending",
      })
    );

    dispatch(cartActions.clearUnavailableItems());

    try {
      const response = await fetch(`${baseUrl}products/one-product/${id}`);

      const data = await response.json();

      if (data.status === "fail") throw new Error(data.message);

      const product = data.data.data;

      if (!product.available) throw new Error("Product is no longer available");

      dispatch(cartActions.addProduct({ id: product._id, quantity }));

      dispatch(
        uiActions.showNotification({
          status: "success",
          message: "Product added to cart!",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: err.message,
        })
      );
    }

    setTimeout(() => {
      dispatch(uiActions.hideNotification());
    }, 4000);
  };
};

export const redoOrder = function (products) {
  return async function (dispatch) {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        message: "Pending",
      })
    );

    dispatch(cartActions.clearUnavailableItems());

    const unavailableItems = [];

    const productsDB = await Promise.all(
      products.map(async (product) => {
        try {
          const response = await fetch(
            `${baseUrl}products/one-product/${product.productId._id}`
          );

          const data = await response.json();

          if (data.status === "fail") throw new Error();

          const productDB = data.data.data;

          if (productDB === undefined) throw new Error();

          if (!productDB.available) throw new Error();

          return {
            id: productDB._id,
            quantity: product.productQuantity,
          };
        } catch (err) {
          unavailableItems.push(product);
        }
      })
    );

    const filteredProductsDB = productsDB.filter(
      (product) => product !== undefined
    );

    if (filteredProductsDB.length > 0 && unavailableItems.length <= 0) {
      productsDB.forEach((product) => {
        dispatch(cartActions.addProduct(product));
      });

      dispatch(
        uiActions.showNotification({
          status: "success",
          message: "All products added to cart!",
        })
      );
    }

    if (filteredProductsDB.length > 0 && unavailableItems.length > 0) {
      filteredProductsDB.forEach((product) =>
        dispatch(cartActions.addProduct(product))
      );

      dispatch(
        uiActions.showNotification({
          status: "success",
          message: "Some of the products could not be added",
        })
      );
    }

    if (filteredProductsDB.length === 0) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "Products could not be added to cart",
        })
      );
    }

    setTimeout(() => {
      dispatch(uiActions.hideNotification());
    }, 4000);
  };
};

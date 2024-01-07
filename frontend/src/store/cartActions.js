import { cartActions } from "./cartSlice";
import { uiActions } from "./uiSlice";

import { baseUrl } from "../util/requests";

export const addProductToCart = function (id, quantity) {
  return async function (dispatch) {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        message: "Pending",
      })
    );

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

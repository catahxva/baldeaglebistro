import { createSlice } from "@reduxjs/toolkit";

const cartItemsLocalStorage = JSON.parse(localStorage.getItem("cartItems"));

const initialCartState = {
  items: cartItemsLocalStorage || [],
  unavailableItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addProduct(state, action) {
      const index = state.items.findIndex(
        (product) => product.id === action.payload.id
      );

      if (index >= 0) {
        state.items[index] = {
          ...state.items[index],
          quantity: state.items[index].quantity + action.payload.quantity,
        };
      }

      if (index < 0) state.items.push(action.payload);
    },
    removeProduct(state, action) {
      const index = state.items.findIndex(
        (product) => product.id === action.payload.id
      );

      if (index >= 0) state.items.splice(index, 1);

      if (index < 0) return;
    },
    increaseQuantity(state, action) {
      const index = state.items.findIndex(
        (product) => product.id === action.payload.id
      );

      if (index >= 0) {
        state.items[index] = {
          ...state.items[index],
          quantity: state.items[index].quantity + 1,
        };
      }

      if (index < 0) return;
    },
    decreaseQuantity(state, action) {
      const index = state.items.findIndex(
        (product) => product.id === action.payload.id
      );

      if (index >= 0) {
        state.items[index] = {
          ...state.items[index],
          quantity: state.items[index].quantity - 1,
        };
      }

      if (index < 0) return;
    },
    clearCart(state) {
      state.items = [];
    },
    addUnavailableItems(state, action) {
      action.payload.unavailableItems.forEach((item) => {
        state.unavailableItems.push(item);
      });
    },
    clearUnavailableItems(state, action) {
      state.unavailableItems = [];
    },
  },
});

export const cartActions = cartSlice.actions;

export const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (
    cartActions.addProduct.match(action) ||
    cartActions.removeProduct.match(action) ||
    cartActions.increaseQuantity.match(action) ||
    cartActions.decreaseQuantity.match(action)
  ) {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(store.getState().cart.items)
    );
  }

  if (cartActions.clearCart.match(action)) {
    localStorage.removeItem("cartItems");
  }

  return result;
};

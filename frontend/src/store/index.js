import { configureStore } from "@reduxjs/toolkit";

import { cartSlice, cartMiddleware } from "./cartSlice";
import { uiSlice } from "./uiSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(cartMiddleware);
  },
});

export default store;

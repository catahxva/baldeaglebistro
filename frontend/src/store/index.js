import { configureStore } from "@reduxjs/toolkit";

import { cartSlice, cartMiddleware } from "./cartSlice";
import { addressSlice } from "./addressSlice";
import { uiSlice } from "./uiSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    address: addressSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(cartMiddleware);
  },
});

export default store;

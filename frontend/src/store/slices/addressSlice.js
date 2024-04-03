import { createSlice } from "@reduxjs/toolkit";

const initialAddressSlice = {
  address: null,
  carrier: null,
};

export const addressSlice = createSlice({
  name: "address",
  initialState: initialAddressSlice,
  reducers: {
    setAddress(state, action) {
      state.address = action.payload;
    },
    setCarrier(state, action) {
      state.carrier = action.payload.delivery;
    },
    clearAddress(state) {
      state.address = null;
    },
  },
});

export const addressActions = addressSlice.actions;

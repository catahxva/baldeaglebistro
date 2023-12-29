import { createSlice } from "@reduxjs/toolkit";

const initialAddressSlice = {
  address: undefined,
  carrier: undefined,
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
      state.address = undefined;
    },
  },
});

export const addressActions = addressSlice.actions;

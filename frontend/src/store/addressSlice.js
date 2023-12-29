import { createSlice } from "@reduxjs/toolkit";

const initialAddressSlice = {
  address: undefined,
};

export const addressSlice = createSlice({
  name: "address",
  initialState: initialAddressSlice,
  reducers: {
    setAddress(state, action) {
      state.address = action.payload;
    },
    clearAddress(state) {
      state.address = undefined;
    },
  },
});

export const addressActions = addressSlice.actions;

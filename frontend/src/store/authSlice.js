import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {},
});

export const authActions = authSlice.actions;

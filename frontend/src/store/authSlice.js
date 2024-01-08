import { createSlice } from "@reduxjs/toolkit";

const tokenLocalStorage = localStorage.getItem(`token`);
const tokenExpirationDateLocalStorage = localStorage.getItem(
  "tokenExpirationDate"
);
const emailLocalStorage = localStorage.getItem(`email`);
const usernameLocalStorage = localStorage.getItem("username");
const addressLocalStorage = localStorage.getItem("address");

const token =
  tokenLocalStorage !== "undefined" ? JSON.parse(tokenLocalStorage) : undefined;
const tokenExpirationDate =
  tokenExpirationDateLocalStorage !== "undefined"
    ? JSON.parse(tokenExpirationDateLocalStorage)
    : undefined;
const email =
  emailLocalStorage !== "undefined" ? JSON.parse(emailLocalStorage) : undefined;
const username =
  usernameLocalStorage !== "undefined"
    ? JSON.parse(usernameLocalStorage)
    : undefined;
const address =
  addressLocalStorage !== "undefined"
    ? JSON.parse(addressLocalStorage)
    : undefined;

const initialAuthState = {
  token,
  tokenExpirationDate,
  email,
  username,
  address,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    authenticate(state, action) {
      state.token = action.payload.token;
      state.tokenExpirationDate = new Date(
        new Date().getTime() + 90 * 86400
      ).toISOString();
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.address = action.payload.address;
    },
    deauthenticate(state) {
      state.token = undefined;
      state.tokenExpirationDate = undefined;
      state.email = undefined;
      state.username = undefined;
      state.address = undefined;
    },
  },
});

export const authActions = authSlice.actions;

export const authMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (authActions.authenticate.match(action)) {
    localStorage.setItem(`token`, JSON.stringify(store.getState().auth.token));
    localStorage.setItem(
      `tokenExpirationDate`,
      JSON.stringify(store.getState().auth.tokenExpirationDate)
    );
    localStorage.setItem(`email`, JSON.stringify(store.getState().auth.email));
    localStorage.setItem(
      `username`,
      JSON.stringify(store.getState().auth.username)
    );
    localStorage.setItem(
      `address`,
      JSON.stringify(store.getState().auth.address)
    );
  }

  if (authActions.deauthenticate.match(action)) {
    localStorage.removeItem(`token`);
    localStorage.removeItem(`tokenExpirationDate`);
    localStorage.removeItem(`email`);
    localStorage.removeItem(`username`);
    localStorage.removeItem(`address`);
  }

  return result;
};

import { createSlice } from "@reduxjs/toolkit";

const token = JSON.parse(localStorage.getItem(`token`));
const tokenExpirationDate = JSON.parse(
  localStorage.getItem("tokenExpirationDate")
);
const role = JSON.parse(localStorage.getItem(`role`));
const email = JSON.parse(localStorage.getItem(`email`));
const username = JSON.parse(localStorage.getItem("username"));
const address = JSON.parse(localStorage.getItem("address"));

const initialAuthState = {
  token,
  tokenExpirationDate,
  role,
  email,
  username,
  address,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    authenticate(state, action) {
      state.token = !action.payload.token ? null : action.payload.token;
      state.tokenExpirationDate = new Date(
        new Date().getTime() + 90 * 86400
      ).toISOString();
      state.role = !action.payload.role ? null : action.payload.role;
      state.email = !action.payload.email ? null : action.payload.email;
      state.username = !action.payload.username
        ? null
        : action.payload.username;
      state.address = !action.payload.address ? null : action.payload.address;
    },
    deauthenticate(state) {
      state.token = null;
      state.tokenExpirationDate = null;
      state.role = null;
      state.email = null;
      state.username = null;
      state.address = null;
    },
    updateUserAddress(state, action) {
      state.address = !action.payload.address ? null : action.payload.address;
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
    localStorage.setItem(`role`, JSON.stringify(store.getState().auth.role));
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
    localStorage.removeItem(`role`);
    localStorage.removeItem(`email`);
    localStorage.removeItem(`username`);
    localStorage.removeItem(`address`);
  }

  if (authActions.updateUserAddress.match(action)) {
    localStorage.setItem(
      `address`,
      JSON.stringify(store.getState().auth.address)
    );
  }

  return result;
};

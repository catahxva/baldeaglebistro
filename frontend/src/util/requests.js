import CustomError from "./customError";

export const baseUrl = `http://localhost:3000/api/`;

export const fetchProducts = async function (signal, queryString) {
  const url =
    queryString && queryString !== "?"
      ? `${baseUrl}products${queryString}`
      : `${baseUrl}products`;

  const response = await fetch(url, {
    signal,
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const fetchFilters = async function (signal, category) {
  const url = category
    ? `${baseUrl}products/get-filters/${category}`
    : `${baseUrl}products/get-filters`;

  const response = await fetch(url, {
    signal,
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const fetchProduct = async function (signal, id) {
  const response = await fetch(`${baseUrl}products/one-product/${id}`, {
    signal,
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const uploadProduct = async function ({ productData, token }) {
  console.log(productData);

  const response = await fetch(`${baseUrl}products`, {
    method: "POST",
    body: productData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const deleteProduct = async function ({ id, token }) {
  const response = await fetch(`${baseUrl}products/delete-product/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 204)
    return { status: "success", message: "Product deleted successfully" };

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const updateProduct = async function ({ id, availability, token }) {
  const response = await fetch(`${baseUrl}products/update-product/${id}`, {
    method: "POST",
    body: JSON.stringify({ availability }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const obtainCartProducts = async function (cartItems) {
  const response = await fetch(`${baseUrl}products/cart-items`, {
    method: "POST",
    body: JSON.stringify({ products: cartItems }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const obtainPaymentIntent = async function (
  signal,
  shipping,
  products,
  token
) {
  if (!shipping) throw new Error("You must provide a shipping address");
  if (!products)
    throw new Error(
      "You must have products inside your cart to perform a payment"
    );

  const response = await fetch(`${baseUrl}orders/create-payment`, {
    signal,
    method: "POST",
    body: JSON.stringify({ shipping, products, token }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const sendRating = async function ({ token, id, rating }) {
  if (!id) throw new Error("An ID must be provided to perform this action");
  if (!rating)
    throw new Error("You must provide a rating to perform this action");

  const response = await fetch(`${baseUrl}ratings/create-rating`, {
    method: "POST",
    body: JSON.stringify({ id, rating }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data.message;
};

export const signup = async function ({
  username,
  email,
  password,
  passwordConfirm,
}) {
  const response = await fetch(`${baseUrl}users/signup`, {
    method: "POST",
    body: JSON.stringify({ username, email, password, passwordConfirm }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (data.status === "fail" && data.message === "Validation error")
    throw new CustomError(data.message, data.error);

  if (data.status === "fail" && data.message === "MongoServerError")
    throw new CustomError(data.message, data.error);

  if (data.status === "fail") throw new Error(data.message);
};

export const verifyAccount = async function ({ token }) {
  const response = await fetch(`${baseUrl}users/verify-account`, {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  console.log(data);

  return data;
};

export const login = async function ({ email, password }) {
  const response = await fetch(`${baseUrl}users/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const forgotPassword = async function ({ email }) {
  const response = await fetch(`${baseUrl}users/forgot`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);
};

export const resetForgotPassword = async function ({
  token,
  newPassword,
  newPasswordConfirm,
}) {
  const response = await fetch(`${baseUrl}users/forgot-reset`, {
    method: "POST",
    body: JSON.stringify({ token, newPassword, newPasswordConfirm }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);
};

export const updatePassword = async function ({
  token,
  currentPassword,
  newPassword,
  newPasswordConfirm,
}) {
  const response = await fetch(`${baseUrl}users/reset`, {
    method: "POST",
    body: JSON.stringify({ currentPassword, newPassword, newPasswordConfirm }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const updateAddress = async function ({
  token,
  email,
  name,
  phone,
  street,
  streetNumber,
}) {
  const response = await fetch(`${baseUrl}users/change-address`, {
    method: "POST",
    body: JSON.stringify({ email, name, phone, street, streetNumber }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const getUserOrders = async function (signal, token) {
  const response = await fetch(`${baseUrl}orders`, {
    signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const getAllOrders = async function (signal, token, queryString) {
  const urlString = queryString
    ? `${baseUrl}orders/all${queryString}`
    : `${baseUrl}orders/all`;

  const response = await fetch(urlString, {
    signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const fetchOrder = async function (signal, id) {
  const response = await fetch(`${baseUrl}orders/one-order/${id}`, {
    signal,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

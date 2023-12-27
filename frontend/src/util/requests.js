export const baseUrl = `http://localhost:3000/api/`;

export const fetchProducts = async function (signal, queryString) {
  const url = queryString
    ? `${baseUrl}products${queryString}`
    : `${baseUrl}products`;

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

export const sendRating = async function ({ id, rating }) {
  if (!id) throw new Error("An ID must be provided to perform this action");
  if (!rating)
    throw new Error("You must provide a rating to perform this action");

  const response = await fetch(`${baseUrl}ratings/create-rating`, {
    method: "POST",
    body: JSON.stringify({ id, rating }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data.message;
};

const baseUrl = `http://localhost:3000/api/`;

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

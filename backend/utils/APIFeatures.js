exports.createFilters = (query) => {
  const filters = {};

  console.log(query);

  if (query.category) {
    console.log(query.category);
    filters.category = query.category;
  }

  if (query.search) {
    filters.$or = [
      { name: { $regex: new RegExp(query.search, "i") } },
      { category: { $regex: new RegExp(query.search, "i") } },
    ];
  }

  return filters;
};

exports.createSort = (query) => {
  let sortCriteria = {};

  if (query.sort === "priceAscending") {
    sortCriteria = { price: 1 };
  }

  if (query.sort === "priceDescending") {
    sortCriteria = { price: -1 };
  }

  if (query.sort === "ratingAscending") {
    sortCriteria = { rating: 1 };
  }

  if (query.sort === "ratingDescending") {
    sortCriteria = { rating: -1 };
  }

  if (query.sort === "latest") {
    sortCriteria = { createdAt: -1 };
  }

  return sortCriteria;
};

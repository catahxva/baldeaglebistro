exports.createFilters = (query) => {
  const filters = {};

  if (query.category) {
    filters.category = {
      $in: query.category.split(","),
    };
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

  if (query.sort === "popular") {
    sortCriteria = { orderCount: -1 };
  }

  return sortCriteria;
};

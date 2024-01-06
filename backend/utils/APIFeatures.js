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

  if (query.minPrice && query.maxPrice) {
    filters.price = {
      $gte: query.minPrice,
      $lte: query.maxPrice,
    };
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

  if (query.sort === "latest") {
    sortCriteria = { createdAt: -1 };
  }

  if (query.sort === "popular") {
    sortCriteria = { orderCount: -1 };
  }

  return sortCriteria;
};

exports.createPagination = (query) => {
  let skip = 0;
  let limit = 8;

  if (query.limit) {
    limit = query.limit;
  }

  if (query.page) {
    skip = query.page * limit - limit;
  }

  return [skip, limit];
};

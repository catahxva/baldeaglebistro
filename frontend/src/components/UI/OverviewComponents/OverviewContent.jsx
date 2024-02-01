import classes from "./OverviewContent.module.css";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchFilters, fetchProducts } from "../../../util/requests";

import Placeholder from "../Others/Placeholder";
import OverviewFilters from "./OverviewFilters";
import OverviewAppliedFilters from "./OverviewAppliedFilters";
import OverviewSort from "./OverviewSort";
import OverviewGrid from "./OverviewGrid";
import Pagination from "../Others/Pagination";
import MobileMenu from "../Others/MobileMenu";

function OverviewContent() {
  // get current category (if there is one)
  const { category } = useParams();

  const [mobileMenu, setMobileMenu] = useState(false);

  // get search params
  const [searchParams, setSearchParams] = useSearchParams();

  // scroll back to top when search params change
  useEffect(() => {
    window.scrollTo(0, 0);

    setMobileMenu(false);
  }, [searchParams]);

  // derive data from the search params
  const searchParamsObject = Object.fromEntries(searchParams);
  const searchParamsValues = Object.values(searchParamsObject)
    .map((value) => value.split(","))
    .flat();
  const searchParamsEntriesAll = Object.entries(searchParamsObject);
  const searchParamsEntriesBasicAndPrice = searchParamsEntriesAll.filter(
    (entry) => entry[0] !== "sort" && entry[0] !== "page"
  );

  const {
    minPrice: minPriceQuery,
    maxPrice: maxPriceQuery,
    sort: sortQuery,
    page: pageQuery,
  } = searchParamsObject;

  // handler for filtering
  const filterHandler = function (filter, value) {
    setSearchParams((prevParams) => {
      const prevParamsObject = Object.fromEntries(prevParams);

      const paramsExistingFilters = Object.keys(prevParamsObject);
      const currentFilterValues = prevParamsObject[filter]?.split(",");

      const filterExists = paramsExistingFilters?.find(
        (existingFilter) => existingFilter === filter
      );
      const valueExists = currentFilterValues?.find(
        (existingValue) => existingValue === value
      );

      delete prevParamsObject.page;

      if (filterExists && !valueExists) {
        return {
          ...prevParamsObject,
          [filterExists]: `${prevParamsObject[filterExists]},${value}`,
        };
      }

      if (!filterExists && !valueExists) {
        return {
          ...prevParamsObject,
          [filter]: value,
        };
      }

      if (filterExists && valueExists && currentFilterValues.length > 1) {
        const indexOfValue = currentFilterValues.findIndex(
          (val) => val === valueExists
        );

        const currentFilterValuesCopy = [...currentFilterValues];
        currentFilterValuesCopy.splice(indexOfValue, 1);

        const newFilterValue = currentFilterValuesCopy.join(",");

        return {
          ...prevParamsObject,
          [filterExists]: newFilterValue,
        };
      }

      if (filterExists && valueExists && currentFilterValues.length === 1) {
        delete prevParamsObject[filterExists];

        return {
          ...prevParamsObject,
        };
      }

      return prevParamsObject;
    });
  };

  // special handler for price
  const priceFilterHandler = function (priceValues) {
    setSearchParams((prevParams) => {
      const prevParamsObject = Object.fromEntries(prevParams);

      delete prevParamsObject.page;

      return {
        ...prevParamsObject,
        minPrice: priceValues[0],
        maxPrice: priceValues[1],
      };
    });
  };

  // special handler for removing price
  const priceFilterRemoveHandler = function () {
    setSearchParams((prevParams) => {
      const prevParamsObject = Object.fromEntries(prevParams);

      delete prevParamsObject.minPrice;
      delete prevParamsObject.maxPrice;
      delete prevParamsObject.page;

      return {
        ...prevParamsObject,
      };
    });
  };

  // handler for sorting products
  const sortHandler = function (e) {
    const value = e.target.value;

    setSearchParams((prevParams) => {
      const prevParamsObject = Object.fromEntries(prevParams);

      delete prevParamsObject.page;

      if (value === "default") {
        delete prevParamsObject.sort;

        return {
          ...prevParamsObject,
        };
      }

      return {
        ...prevParamsObject,
        sort: value,
      };
    });
  };

  // handler for pagination
  const paginationHandler = function (page) {
    setSearchParams((prevParams) => {
      const prevParamsObject = Object.fromEntries(prevParams);

      if (page === 1) {
        delete prevParamsObject.page;

        return {
          ...prevParamsObject,
        };
      }

      return {
        ...prevParamsObject,
        page: page,
      };
    });
  };

  // get dynamic filters from the backend
  const {
    data: filters,
    isPending: isPendingFilters,
    isError: isErrorFilters,
    error: filtersError,
  } = useQuery({
    queryKey: ["filters", category],
    queryFn: ({ signal }) => fetchFilters(signal, category),
  });

  let filtersContent;

  if (isPendingFilters) filtersContent = <Placeholder type="loading" />;

  if (filters) {
    const { maxPrice, minPrice } = filters.data.data;

    const otherFilters = Object.entries(filters.data.data).filter(
      (filter) => filter[0] !== "minPrice" && filter[0] !== "maxPrice"
    );

    filtersContent = (
      <>
        <MobileMenu openMobileMenu={mobileMenu} closeMobileMenu={setMobileMenu}>
          <OverviewFilters
            filterHandler={filterHandler}
            priceFilterHandler={priceFilterHandler}
            filtersDB={otherFilters}
            filtersActive={searchParamsValues}
            minPriceDB={minPrice}
            maxPriceDB={maxPrice}
            existingMinPrice={minPriceQuery}
            existingMaxPrice={maxPriceQuery}
          />
        </MobileMenu>
        <div className={classes.overview__content__special__wrapper}>
          <OverviewFilters
            filterHandler={filterHandler}
            priceFilterHandler={priceFilterHandler}
            filtersDB={otherFilters}
            filtersActive={searchParamsValues}
            minPriceDB={minPrice}
            maxPriceDB={maxPrice}
            existingMinPrice={minPriceQuery}
            existingMaxPrice={maxPriceQuery}
          />
        </div>
      </>
    );
  }

  if (isErrorFilters)
    filtersContent = (
      <Placeholder type="error" message={filtersError.message} />
    );

  // create query string
  const queryString = !category
    ? `?${searchParamsEntriesAll.map((entry) => entry.join("=")).join("&")}`
    : `?category=${category}&${searchParamsEntriesAll
        .map((entry) => entry.join("="))
        .join("&")}
    `;

  // get products
  const {
    data: products,
    isPending: isPendingProducts,
    isError: isErrorProducts,
    error: productsError,
  } = useQuery({
    queryKey: ["products", queryString],
    queryFn: ({ signal }) => fetchProducts(signal, queryString),
  });

  let productsContent;

  if (isPendingProducts) productsContent = <Placeholder type="loading" />;

  if (isErrorProducts)
    productsContent = (
      <Placeholder type="error" message={productsError.message} />
    );

  if (products && products.data.data.length <= 0) {
    productsContent = (
      <span className={classes.overview__content__span__no__results}>
        There are no results for your query!
      </span>
    );
  }

  if (products && products.data.data.length > 0) {
    productsContent = (
      <>
        <OverviewGrid products={products.data.data} />
        <Pagination
          maxPage={products.data.maxPages}
          currentPage={pageQuery ?? 1}
          paginationHandler={paginationHandler}
        />
      </>
    );
  }

  return (
    <section className="first__section section__min__height">
      <h2>All products</h2>
      <div className={classes.overview__content__grid}>
        <div className={classes.overview__content__grid__container}>
          {filtersContent}
        </div>
        <div className={classes.overview__content__grid__container}>
          <button
            onClick={() => setMobileMenu(true)}
            className={classes.overview__content__mobile__btn}
          >
            Show Filters
          </button>
          {searchParamsEntriesBasicAndPrice.length > 0 && (
            <OverviewAppliedFilters
              activeFiltersEntries={searchParamsEntriesBasicAndPrice}
              filterHandler={filterHandler}
              priceRemoveHandler={priceFilterRemoveHandler}
            />
          )}
          <OverviewSort onChange={sortHandler} existingSort={sortQuery} />
          {productsContent}
        </div>
      </div>
    </section>
  );
}

export default OverviewContent;

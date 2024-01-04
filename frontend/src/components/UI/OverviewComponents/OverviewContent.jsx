import classes from "./OverviewContent.module.css";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchFilters } from "../../../util/requests";

import Placeholder from "../Others/Placeholder";
import OverviewFilters from "./OverviewFilters";
import OverviewAppliedFilters from "./OverviewAppliedFilters";
import OverviewSort from "./OverviewSort";
import OverviewGrid from "./OverviewGrid";

function OverviewContent() {
  console.log("TEST");
  const [limit, setLimit] = useState(8);
  const [productsState, setProductsState] = useState([]);
  const [totalProducts, setTotalProducts] = useState();

  const helperRef = useRef();

  useEffect(() => {
    const observerCallback = function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setLimit((prevState) => prevState + 8);
      });
    };

    const observerOptions = {
      root: null,
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (!helperRef.current) return;

    observer.observe(helperRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParams]);

  const { category } = useParams();

  const searchParamsObject = Object.fromEntries(searchParams);
  const searchParamsEntries = Object.entries(searchParamsObject);

  const filteredSearchParamsEntries = searchParamsEntries.filter((entry) => {
    if (entry[0] !== "sort") return entry;
  });

  const queryStr = `?${searchParamsEntries
    .map((entry) => entry.join("="))
    .join("&")}&limit=${limit}`;

  const { minPrice, maxPrice, sort } = searchParamsObject;

  const filterHandler = function (group, value) {
    setLimit(8);
    setProductsState([]);

    setSearchParams((prevParams) => {
      const prevParamsObject = Object.fromEntries(prevParams);

      const prevGroupValues = prevParamsObject[group]?.split(",");
      const keys = Object.keys(prevParamsObject);

      const groupExists = keys?.find((key) => key === group);
      const valueExists = prevGroupValues?.find((val) => val === value);

      if (groupExists && !valueExists) {
        const newGroupValues = [...prevGroupValues, value].join(",");

        return {
          ...prevParamsObject,
          [group]: newGroupValues,
        };
      }

      if (!groupExists && !valueExists) {
        return {
          ...prevParamsObject,
          [group]: value,
        };
      }

      if (groupExists && valueExists && prevGroupValues.length > 1) {
        const indexOfExistingValue = prevGroupValues.findIndex(
          (val) => val === valueExists
        );

        const prevGroupValuesCopy = [...prevGroupValues];
        prevGroupValuesCopy.splice(indexOfExistingValue, 1);

        const newGroupValues = prevGroupValuesCopy.join(",");

        return {
          ...prevParamsObject,
          [group]: newGroupValues,
        };
      }

      if (groupExists && valueExists && prevGroupValues.length === 1) {
        delete prevParamsObject[groupExists];

        return { ...prevParamsObject };
      }

      return prevParams;
    });
  };

  const priceFilterHandler = useCallback(
    function (arr) {
      setLimit(8);
      setProductsState([]);

      setSearchParams((prevParams) => {
        const prevParamsObject = Object.fromEntries(prevParams);

        return {
          ...prevParamsObject,
          ["minPrice"]: arr[0],
          ["maxPrice"]: arr[1],
        };
      });
    },
    [setSearchParams, setLimit, setProductsState]
  );

  const removePriceFilterHandler = function () {
    setLimit(8);
    setProductsState([]);

    setSearchParams((prevParams) => {
      const prevParamsObject = Object.fromEntries(prevParams);

      delete prevParamsObject["minPrice"];
      delete prevParamsObject["maxPrice"];

      return {
        ...prevParamsObject,
      };
    });
  };

  const sortHandler = function (e) {
    setLimit(8);
    setProductsState([]);

    const value = e.target.value;

    setSearchParams((prevParams) => {
      const prevParamsObject = Object.fromEntries(prevParams);

      if (value === "default") {
        delete prevParamsObject.sort;

        return prevParamsObject;
      }

      return {
        ...prevParamsObject,
        sort: value,
      };
    });
  };

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

  if (isErrorFilters)
    filtersContent = (
      <Placeholder type="error" message={filtersError.message} />
    );

  if (filters)
    filtersContent = (
      <OverviewFilters
        filters={filters}
        activeFiltersEntries={searchParamsEntries}
        filterHandler={filterHandler}
        priceFilterHandler={priceFilterHandler}
        minPriceQuery={minPrice}
        maxPriceQuery={maxPrice}
      />
    );

  const {
    data: products,
    isPending: isPendingProducts,
    isError: isErrorProducts,
    error: productsError,
  } = useQuery({
    queryKey: ["overviewProducts", queryStr],
    queryFn: ({ signal }) => fetchProducts(signal, queryStr),
  });

  useEffect(() => {
    if (products) {
      setProductsState(products.data.data);
      setTotalProducts(products.data.totalProducts);
    }
  }, [products]);

  return (
    <section className="first__section section__min__height">
      <h2>All products</h2>
      <div className={classes.overview__content__grid}>
        <div className={classes.overview__content__grid__container}>
          {filtersContent}
        </div>
        <div className={classes.overview__content__grid__container}>
          {filteredSearchParamsEntries.length > 0 && (
            <OverviewAppliedFilters
              appliedFilters={filteredSearchParamsEntries}
              filterHandler={filterHandler}
              removeLimitHandler={removePriceFilterHandler}
            />
          )}
          <OverviewSort onChange={sortHandler} activeSort={sort} />
          {productsState.length === 0 && !isErrorProducts && (
            <Placeholder type="loading" />
          )}
          {isErrorProducts && (
            <Placeholder type="error" message={productsError.message} />
          )}
          {productsState.length > 0 && (
            <OverviewGrid products={productsState} />
          )}
          <div
            className={classes.overview__content__helper__element}
            ref={helperRef}
          ></div>
          {isPendingProducts && productsState.length < totalProducts && (
            <div className={classes.overview__content__container__span}>
              <span className={classes.overview__content__span}>
                Loading...
              </span>
            </div>
          )}
          {productsState.length === totalProducts && (
            <div className={classes.overview__content__container__span}>
              <span className={classes.overview__content__span}>
                You have reached the bottom of the page
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default OverviewContent;

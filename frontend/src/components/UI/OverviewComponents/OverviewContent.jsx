import classes from "./OverviewContent.module.css";

import { useCallback, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchFilters } from "../../../util/requests";

import Placeholder from "../Others/Placeholder";
import OverviewFilters from "./OverviewFilters";
import OverviewAppliedFilters from "./OverviewAppliedFilters";
import OverviewSort from "./OverviewSort";

function OverviewContent() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParams]);

  const { category } = useParams();

  const searchParamsObject = Object.fromEntries(searchParams);
  const searchParamsEntries = Object.entries(searchParamsObject);

  const { minPrice, maxPrice } = searchParamsObject;

  const filterHandler = function (group, value) {
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

  const sortHandler = function (e) {
    const value = e.target.value;

    setSearchParams((prevParams) => {});
  };

  const priceFilterHandler = useCallback(function (arr) {
    setSearchParams((prevParams) => {
      const prevParamsObject = Object.fromEntries(prevParams);

      return {
        ...prevParamsObject,
        ["minPrice"]: arr[0],
        ["maxPrice"]: arr[1],
      };
    });
  }, []);

  const removePriceFilterHandler = function () {
    setSearchParams((prevParams) => {
      const prevParamsObject = Object.fromEntries(prevParams);

      delete prevParamsObject["minPrice"];
      delete prevParamsObject["maxPrice"];

      return {
        ...prevParamsObject,
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

  return (
    <section className="first__section section__min__height">
      <h2>All products</h2>
      <div className={classes.overview__content__grid}>
        <div className={classes.overview__content__grid__container}>
          {filtersContent}
        </div>
        <div className={classes.overview__content__grid__container}>
          {searchParamsEntries.length > 0 && (
            <OverviewAppliedFilters
              appliedFilters={searchParamsEntries}
              filterHandler={filterHandler}
              removeLimitHandler={removePriceFilterHandler}
            />
          )}
          <OverviewSort onChange={sortHandler} />
        </div>
      </div>
    </section>
  );
}

export default OverviewContent;

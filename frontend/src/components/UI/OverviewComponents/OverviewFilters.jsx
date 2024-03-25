import classes from "./OverviewFilters.module.css";

import { useFilterHandler } from "../../../hooks/useFilterHandler";

import OverviewFiltersPrice from "./OverviewFiltersPrice";

function OverviewFilters({
  filtersDB,
  filtersActive,
  minPriceDB,
  maxPriceDB,
  existingMinPrice,
  existingMaxPrice,
}) {
  const filterHandler = useFilterHandler();

  return (
    <div className={classes.overview__filters}>
      <OverviewFiltersPrice
        minPriceDB={minPriceDB}
        maxPriceDB={maxPriceDB}
        existingMinPrice={existingMinPrice}
        existingMaxPrice={existingMaxPrice}
      />
      {filtersDB.map((filter) => {
        const filterKeyFirstWord = filter[0].split(/(?=[A-Z])/)[0];
        const filterTitle =
          filterKeyFirstWord[0].toUpperCase() + filterKeyFirstWord.slice(1);

        return (
          <div key={filterTitle}>
            <h3 className={classes.overview__filters__group__title}>
              {filterTitle}
            </h3>
            <div className={classes.overview__filters__group__container}>
              {filter[1].map((filterValue) => {
                const filterValueActive = filtersActive.includes(filterValue);

                const formattedFilterValue = filterValue
                  .split(" ")
                  .map((fV) => fV[0].toUpperCase() + fV.slice(1))
                  .join(" ");

                return (
                  <button
                    onClick={() =>
                      filterHandler(filterKeyFirstWord, filterValue)
                    }
                    key={filterValue}
                    className={classes.overview__filter}
                  >
                    <div
                      className={`${classes.overview__filter__deco} ${
                        filterValueActive &&
                        classes.overview__filter__deco__active
                      }`}
                    ></div>
                    <span className={classes.overview__filter__span}>
                      {formattedFilterValue}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OverviewFilters;

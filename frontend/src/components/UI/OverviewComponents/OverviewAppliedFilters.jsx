import classes from "./OverviewAppliedFilters.module.css";

import { useFilterHandler } from "../../../hooks/useFilterHandler";
import { usePriceFilterHandlers } from "../../../hooks/usePriceFilterHandlers";
import { useParamsData } from "../../../hooks/useParamsData";

const processActiveFiltersEntries = function (activeFiltersEntries) {
  const basicFilterEntries = activeFiltersEntries.filter(
    (entry) => entry[0] !== "minPrice" && entry[0] !== "maxPrice"
  );

  const priceFilterValues = activeFiltersEntries
    .filter((entry) => entry[0] === "minPrice" || entry[0] === "maxPrice")
    .map((entry) => entry[1]);

  return { basicFilterEntries, priceFilterValues };
};

function OverviewAppliedFilters() {
  const filterHandler = useFilterHandler();
  const { priceRemoveHandler } = usePriceFilterHandlers();

  const { paramsEntries } = useParamsData();

  const { basicFilterEntries, priceFilterValues } =
    processActiveFiltersEntries(paramsEntries);

  const appliedPriceFilterBtn = priceFilterValues.length === 2 && (
    <button
      className={classes.overview__applied__button}
      onClick={priceRemoveHandler}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`w-6 h-6 ${classes.overview__applied__button__svg}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>

      <span className={classes.overview__applied__button__span}>
        Price limit: {priceFilterValues[0]}$ - {priceFilterValues[1]}$
      </span>
    </button>
  );

  return (
    <div className={classes.overview__applied}>
      <span className={classes.overview__applied__span}>Applied filters:</span>
      <div className={classes.overview__applied__container}>
        {appliedPriceFilterBtn}
        {basicFilterEntries.map((entry) => {
          return entry[1].split(",").map((val) => {
            const formattedVal = val
              .split(" ")
              .map((val) => val[0].toUpperCase() + val.slice(1))
              .join(" ");

            return (
              <button
                key={val}
                className={classes.overview__applied__button}
                onClick={() => filterHandler(entry[0], val)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 ${classes.overview__applied__button__svg}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>

                <span className={classes.overview__applied__button__span}>
                  {formattedVal}
                </span>
              </button>
            );
          });
        })}
      </div>
    </div>
  );
}

export default OverviewAppliedFilters;

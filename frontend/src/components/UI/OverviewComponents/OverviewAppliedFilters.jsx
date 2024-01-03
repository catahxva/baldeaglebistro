import classes from "./OverviewAppliedFilters.module.css";

function OverviewAppliedFilters({
  appliedFilters,
  filterHandler,
  removeLimitHandler,
}) {
  console.log(appliedFilters);

  const filteredAppliedFilters = appliedFilters.filter((filter) => {
    if (filter[0] !== "minPrice" && filter[0] !== "maxPrice") return filter;
  });

  const priceLimitValues = appliedFilters
    .filter((filter) => {
      if (filter[0] === "minPrice" || filter[0] === "maxPrice") return filter;
    })
    .reduce((acc, filter) => {
      acc.push(filter[1]);

      return acc;
    }, []);

  let priceLimitButton;

  if (priceLimitValues.length === 2) {
    priceLimitButton = (
      <button
        onClick={removeLimitHandler}
        className={classes.overview__applied__filter}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 ${classes.overview__applied__filter__svg}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
        <span className={classes.overview__applied__filter__span}>
          Price limit: {priceLimitValues[0]}$ - {priceLimitValues[1]}$
        </span>
      </button>
    );
  }

  return (
    <div className={classes.overview__applied}>
      <span className={classes.overview__applied__span}>Applied filters:</span>
      <div className={classes.overview__applied__filters}>
        {priceLimitButton}
        {filteredAppliedFilters?.map((entry) => {
          return entry[1].split(",").map((value) => {
            const formattedValue = `${value[0].toUpperCase()}${value.slice(1)}`;

            return (
              <button
                key={value}
                onClick={() => filterHandler(entry[0], value)}
                className={classes.overview__applied__filter}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 ${classes.overview__applied__filter__svg}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
                <span className={classes.overview__applied__filter__span}>
                  {formattedValue}
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

import classes from "./OverviewFilters.module.css";

import { useState, useEffect, useRef } from "react";

import { styled } from "@mui/material";

import Slider from "@mui/material/Slider";

const ColorSlider = styled(Slider)({
  color: "#ff8c00",
});

function OverviewFilters({
  filters,
  activeFiltersEntries,
  filterHandler,
  priceFilterHandler,
  minPriceQuery,
  maxPriceQuery,
}) {
  const isInitialLoad = useRef(true);

  const { maxPrice, minPrice } = filters.data.data;

  const [sliderValue, setSliderValue] = useState([minPrice, maxPrice]);

  useEffect(() => {
    if (minPriceQuery && maxPriceQuery)
      setSliderValue([Number(minPriceQuery), Number(maxPriceQuery)]);

    if (!minPriceQuery || !maxPriceQuery) {
      setSliderValue([minPrice, maxPrice]);
      isInitialLoad.current = true;
    }
  }, [minPriceQuery, maxPriceQuery]);

  const changeHandler = function (e, newValue) {
    setSliderValue(newValue);
    isInitialLoad.current = false;
  };

  const inputChangeHandler = function (e, type) {
    if (type === "min")
      setSliderValue((prevSliderValue) => [
        Number(e.target.value),
        prevSliderValue[1],
      ]);

    if (type === "max")
      setSliderValue((prevSliderValue) => [
        prevSliderValue[0],
        Number(e.target.value),
      ]);

    isInitialLoad.current = false;
  };

  useEffect(() => {
    if (isInitialLoad.current) return;

    const timer = setTimeout(() => {
      priceFilterHandler(sliderValue);
      console.log("finished timer");
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [sliderValue, priceFilterHandler, isInitialLoad.current]);

  const filtersEntries = Object.entries(filters.data.data)
    .filter((filterEntry) => {
      return filterEntry[0] !== "maxPrice" && filterEntry[0] !== "minPrice";
    })
    .map((filtersEntry) => {
      return [filtersEntry[0].split(/(?=[A-Z])/)[0], filtersEntry[1]];
    });

  const activeFiltersValues = activeFiltersEntries
    .reduce((acc, entry) => {
      acc.push(entry[1].split(","));

      return acc;
    }, [])
    .flat();

  return (
    <div className={classes.overview__filters}>
      <div className={classes.overview__filters__price}>
        <h3 className={classes.overview__filters__title}>Price ($)</h3>
        <form className={classes.overview__filters__price__form}>
          <div className={classes.overview__filters__price__form__group}>
            <label className={classes.overview__filters__price__form__label}>
              Minimum price
            </label>
            <input
              type="number"
              value={sliderValue[0]}
              onChange={(e) => inputChangeHandler(e, "min")}
              className={classes.overview__filters__price__form__input}
            />
          </div>
          <div className={classes.overview__filters__price__form__group}>
            <label className={classes.overview__filters__price__form__label}>
              Maximum price
            </label>
            <input
              type="number"
              value={sliderValue[1]}
              onChange={(e) => inputChangeHandler(e, "max")}
              className={classes.overview__filters__price__form__input}
            />
          </div>
        </form>
        <ColorSlider
          value={sliderValue}
          getAriaLabel={() => "Price"}
          onChange={changeHandler}
          valueLabelDisplay="auto"
          color="secondary"
        />
      </div>
      {filtersEntries.map((filterEntry) => {
        const groupTitle = `${filterEntry[0][0].toUpperCase()}${filterEntry[0].slice(
          1
        )}`;

        const filters = filterEntry[1].map((filterValue, i) => {
          const activeClass = activeFiltersValues?.includes(filterValue)
            ? classes.overview__filters__filter__deco__active
            : "";

          const formattedFilterValue = `${filterValue[0].toUpperCase()}${filterValue.slice(
            1
          )}`;

          return (
            <button
              key={filterValue}
              onClick={() => filterHandler(filterEntry[0], filterValue)}
              className={classes.overview__filters__filter}
            >
              <div
                className={`${classes.overview__filters__filter__deco} ${activeClass}`}
              ></div>
              <span className={classes.overview__filters__filter__span}>
                {formattedFilterValue}
              </span>
            </button>
          );
        });

        return (
          <div key={groupTitle}>
            <h3 className={classes.overview__filters__title}>{groupTitle}</h3>
            <div className={classes.overview__filters__group}>{filters}</div>
          </div>
        );
      })}
    </div>
  );
}

export default OverviewFilters;

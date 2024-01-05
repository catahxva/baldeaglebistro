import classes from "./OverviewFilters.module.css";

import { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material";

import Slider from "@mui/material/Slider";

const ThemedSlider = styled(Slider)({
  color: "#ff8c00",
});

function OverviewFilters({
  filterHandler,
  priceFilterHandler,
  filtersDB,
  filtersActive,
  minPriceDB,
  maxPriceDB,
  existingMinPrice,
  existingMaxPrice,
}) {
  const stopPriceFilterHandler = useRef(true);

  const [sliderValue, setSliderValue] = useState([minPriceDB, maxPriceDB]);

  useEffect(() => {
    if (existingMinPrice && existingMaxPrice)
      setSliderValue([Number(existingMinPrice), Number(existingMaxPrice)]);

    if (!existingMinPrice && !existingMaxPrice)
      setSliderValue([minPriceDB, maxPriceDB]);

    stopPriceFilterHandler.current = true;
  }, [existingMinPrice, existingMaxPrice]);

  const minPriceInputValue = sliderValue[0];
  const maxPriceInputValue = sliderValue[1];

  const sliderChangeHandler = function (e, newValue) {
    setSliderValue(newValue);

    stopPriceFilterHandler.current = false;
  };

  const inputChangeHandler = function (e, type) {
    const value = Number(e.target.value);

    if (type === "minPrice")
      setSliderValue((prevSliderValue) => [value, prevSliderValue[1]]);
    if (type === "maxPrice")
      setSliderValue((prevSliderValue) => [prevSliderValue[0], value]);

    stopPriceFilterHandler.current = false;
  };

  useEffect(() => {
    if (stopPriceFilterHandler.current) return;

    const timer = setTimeout(() => {
      priceFilterHandler(sliderValue);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [sliderValue]);

  return (
    <div className={classes.overview__filters}>
      <div className={classes.overview__filters__container__price}>
        <h3 className={classes.overview__filters__group__title}>Price</h3>
        <form className={classes.overview__filters__price__form}>
          <div className={classes.overview__filters__price__form__group}>
            <label
              htmlFor="minPrice"
              className={classes.overview__filters__price__label}
            >
              Minimum price:
            </label>
            <input
              name="minPrice"
              type="number"
              className={classes.overview__filters__price__input}
              value={minPriceInputValue}
              onChange={(e) => inputChangeHandler(e, "minPrice")}
            />
          </div>
          <div className={classes.overview__filters__price__form__group}>
            <label
              htmlFor="maxPrice"
              className={classes.overview__filters__price__label}
            >
              Maximum price:
            </label>
            <input
              name="maxPrice"
              type="number"
              className={classes.overview__filters__price__input}
              value={maxPriceInputValue}
              onChange={(e) => inputChangeHandler(e, "maxPrice")}
            />
          </div>
        </form>
        <ThemedSlider
          getAriaLabel={() => "Price range"}
          value={sliderValue}
          onChange={sliderChangeHandler}
        />
      </div>
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

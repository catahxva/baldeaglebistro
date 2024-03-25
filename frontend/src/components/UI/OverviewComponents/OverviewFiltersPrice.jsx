import classes from "./OverviewFiltersPrice.module.css";

import { useState, useEffect, useRef } from "react";
import { usePriceFilterHandlers } from "../../../hooks/usePriceFilterHandlers";

import { styled } from "@mui/material";

import Slider from "@mui/material/Slider";

const ThemedSlider = styled(Slider)({
  color: "#ff8c00",
});

function OverviewFiltersPrice({
  minPriceDB,
  maxPriceDB,
  existingMinPrice,
  existingMaxPrice,
}) {
  const { priceFilterHandler } = usePriceFilterHandlers();

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
  );
}

export default OverviewFiltersPrice;

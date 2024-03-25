import { useSearchParams } from "react-router-dom";

export const usePriceFilterHandlers = function () {
  const [searchParams, setSearchParams] = useSearchParams();

  return {
    priceFilterHandler(priceValues) {
      setSearchParams((prevParams) => {
        const prevParamsObject = Object.fromEntries(prevParams);

        delete prevParamsObject.page;

        return {
          ...prevParamsObject,
          minPrice: priceValues[0],
          maxPrice: priceValues[1],
        };
      });
    },
    priceRemoveHandler() {
      setSearchParams((prevParams) => {
        const prevParamsObject = Object.fromEntries(prevParams);

        delete prevParamsObject.minPrice;
        delete prevParamsObject.maxPrice;
        delete prevParamsObject.page;

        return {
          ...prevParamsObject,
        };
      });
    },
  };
};
s;

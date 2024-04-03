import { useSearchParams } from "react-router-dom";

export const useFilterHandler = function () {
  const [searchParams, setSearchParams] = useSearchParams();

  return function (filter, value) {
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
};

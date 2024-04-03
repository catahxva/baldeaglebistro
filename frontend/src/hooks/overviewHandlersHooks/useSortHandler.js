import { useSearchParams } from "react-router-dom";

export const useSortHandler = function () {
  const [searchParams, setSearchParams] = useSearchParams();

  return function (e) {
    const value = e.target.value;

    setSearchParams((prevParams) => {
      const prevParamsObject = Object.fromEntries(prevParams);

      delete prevParamsObject.page;

      if (value === "default") {
        delete prevParamsObject.sort;

        return {
          ...prevParamsObject,
        };
      }

      return {
        ...prevParamsObject,
        sort: value,
      };
    });
  };
};

import { useSearchParams } from "react-router-dom";

export const usePaginationHandler = function () {
  const [searchParams, setSearchParams] = useSearchParams();

  return function (page) {
    setSearchParams((prevParams) => {
      const prevParamsObject = Object.fromEntries(prevParams);

      if (page === 1) {
        delete prevParamsObject.page;

        return {
          ...prevParamsObject,
        };
      }

      return {
        ...prevParamsObject,
        page: page,
      };
    });
  };
};

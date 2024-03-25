import { useSearchParams } from "react-router-dom";

export const useParamsData = function () {
  const [searchParams] = useSearchParams();

  const searchParamsObject = Object.fromEntries(searchParams);
  const searchParamsValues = Object.values(searchParamsObject)
    .map((value) => value.split(","))
    .flat();

  const searchParamsEntriesAll = Object.entries(searchParamsObject);
  const paramsEntries = searchParamsEntriesAll.filter(
    (entry) => entry[0] !== "sort" && entry[0] !== "page"
  );

  const {
    minPrice: minPriceQuery,
    maxPrice: maxPriceQuery,
    sort: sortQuery,
    page: pageQuery,
  } = searchParamsObject;

  return {
    searchParamsValues,
    searchParamsEntriesAll,
    paramsEntries,
    minPriceQuery,
    maxPriceQuery,
    sortQuery,
    pageQuery,
  };
};

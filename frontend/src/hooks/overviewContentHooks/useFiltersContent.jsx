import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchFilters } from "../../util/requests";
import { useParamsData } from "../generalHooks/useParamsData";

import Placeholder from "../../components/UI/Others/Placeholder";
import OverviewFilters from "../../components/UI/OverviewComponents/OverviewFilters";

export const useFiltersContent = function () {
  const { category } = useParams();

  const { searchParamsValues, minPriceQuery, maxPriceQuery } = useParamsData();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["filters", category],
    queryFn: ({ signal }) => fetchFilters(signal, category),
  });

  let filtersContent;
  let mobileFiltersContent;

  if (isPending) {
    filtersContent = (
      <div className="special__wrapper">
        <Placeholder type="loading" />
      </div>
    );

    mobileFiltersContent = <Placeholder type="loading" />;
  }

  if (data) {
    const { maxPrice, minPrice } = data.data.data;

    const otherFilters = Object.entries(data.data.data).filter(
      (filter) => filter[0] !== "minPrice" && filter[0] !== "maxPrice"
    );

    filtersContent = (
      <div className="special__wrapper">
        <OverviewFilters
          filtersDB={otherFilters}
          filtersActive={searchParamsValues}
          minPriceDB={minPrice}
          maxPriceDB={maxPrice}
          existingMinPrice={minPriceQuery}
          existingMaxPrice={maxPriceQuery}
        />
      </div>
    );

    mobileFiltersContent = (
      <OverviewFilters
        filtersDB={otherFilters}
        filtersActive={searchParamsValues}
        minPriceDB={minPrice}
        maxPriceDB={maxPrice}
        existingMinPrice={minPriceQuery}
        existingMaxPrice={maxPriceQuery}
      />
    );
  }

  if (isError) {
    filtersContent = (
      <div className="special__wrapper">
        <Placeholder type="error" message={error.message} />
      </div>
    );

    mobileFiltersContent = <Placeholder type="error" message={error.message} />;
  }

  return { filtersContent, mobileFiltersContent };
};

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../util/requests";
import { useParamsData } from "../generalHooks/useParamsData";

import Placeholder from "../../components/UI/Others/Placeholder";
import OverviewGrid from "../../components/UI/OverviewComponents/OverviewGrid";
import Pagination from "../../components/UI/Others/Pagination";

export const useProductsContent = function () {
  const { category } = useParams();

  const { searchParamsEntriesAll, pageQuery } = useParamsData();

  const queryString = !category
    ? `?${searchParamsEntriesAll.map((entry) => entry.join("=")).join("&")}`
    : `?category=${category}&${searchParamsEntriesAll
        .map((entry) => entry.join("="))
        .join("&")}
  `;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products", queryString],
    queryFn: ({ signal }) => fetchProducts(signal, queryString),
  });

  let productsContent;

  if (isPending) productsContent = <Placeholder type="loading" />;

  if (isError)
    productsContent = <Placeholder type="error" message={error.message} />;

  if (data && data.data.data.length <= 0)
    productsContent = (
      <span className="no__results">There are no results for your query!</span>
    );

  if (data && data.data.data.length > 0) {
    productsContent = (
      <>
        <OverviewGrid products={data.data.data} />
        <Pagination maxPage={data.data.maxPages} currentPage={pageQuery ?? 1} />
      </>
    );
  }

  return productsContent;
};

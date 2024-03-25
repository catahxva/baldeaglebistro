import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParamsData } from "./useParamsData";

import { getAllOrders } from "../util/requests";

import Placeholder from "../components/UI/Others/Placeholder";
import OrdersList from "../components/UI/Others/OrdersList";
import OrdersNoData from "../components/UI/Others/OrdersNoData";
import Pagination from "../components/UI/Others/Pagination";

export const useGetOrdersContent = function (type) {
  const userToken = useSelector((state) => state.auth.token);

  const { searchParamsEntriesAll, pageQuery } = useParamsData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageQuery]);

  const queryString = `?${searchParamsEntriesAll
    .map((entry) => entry.join("="))
    .join("&")}`;

  const queryKeyStr = type === "all" ? "allOrders" : "userOrders";
  const endpoint = type === "all" ? "/all" : undefined;

  const { data, isPending, isError, error } = useQuery({
    queryKey: [queryKeyStr, { userToken, queryString }],
    queryFn: ({ signal }) =>
      getAllOrders(signal, userToken, queryString, endpoint),
  });

  let content;

  if (isPending) content = <Placeholder type="loading" />;

  if (isError) content = <Placeholder type="error" message={error.message} />;

  if (data && data.data.data.length <= 0) content = <OrdersNoData />;

  if (data && data.data.data.length > 0) {
    const orders = data.data.data;

    content = (
      <>
        <OrdersList orders={orders} type={type} />
        <Pagination maxPage={data.data.maxPages} currentPage={pageQuery ?? 1} />
      </>
    );
  }

  return content;
};

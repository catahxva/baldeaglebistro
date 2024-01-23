import classes from "./AccountAllOrders.module.css";

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../../util/requests";

import Placeholder from "../Others/Placeholder";
import OrdersList from "../Others/OrdersList";
import Pagination from "../Others/Pagination";

function AccountAllOrders() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParams]);

  const searchParamsObject = Object.fromEntries(searchParams);
  const searchParamsEntriesAll = Object.entries(searchParamsObject);

  const { page: pageQuery } = searchParamsObject;

  const paginationHandler = function (page) {
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

  const userToken = useSelector((state) => state.auth.token);

  const queryString = `?${searchParamsEntriesAll
    .map((entry) => entry.join("="))
    .join("&")}`;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["allOrders", { userToken, queryString }],
    queryFn: ({ signal }) => getAllOrders(signal, userToken, queryString),
  });

  let content;

  if (isPending) content = <Placeholder type="loading" />;

  if (isError) content = <Placeholder type="error" message={error.message} />;

  if (data && data.data.data.length <= 0) {
    content = (
      <span className={classes.account__all__orders__span__none}>
        There have been no orders placed yet
      </span>
    );
  }

  if (data && data.data.data.length > 0) {
    const orders = data.data.data;

    content = (
      <>
        <OrdersList orders={orders} listType="all" />
        <Pagination
          maxPage={data.data.maxPages}
          currentPage={pageQuery ?? 1}
          paginationHandler={paginationHandler}
        />
      </>
    );
  }

  return (
    <div className={classes.account__all__orders__container}>
      <h3 className="account__general__title">All Orders</h3>
      {content}
    </div>
  );
}

export default AccountAllOrders;

import classes from "./AccountAllProducts.module.css";

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../../util/requests";

import AccountProductCard from "./AccountProductCard";

import Placeholder from "../Others/Placeholder";
import Pagination from "../Others/Pagination";

function AccountAllProducts() {
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

  const queryString = `?${searchParamsEntriesAll
    .map((entry) => entry.join("="))
    .join("&")}`;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["adminProducts", queryString],
    queryFn: ({ signal }) => fetchProducts(signal, queryString),
  });

  let content;

  if (isPending) {
    console.log("PENDING");
    content = <Placeholder type="loading" />;
  }

  if (isError) content = <Placeholder type="error" message={error.message} />;

  if (data) {
    content = (
      <>
        <div className={classes.account__all__products__list}>
          {data.data.data.map((product) => {
            return <AccountProductCard product={product} key={product._id} />;
          })}
        </div>
        <Pagination
          maxPage={data.data.maxPages}
          currentPage={pageQuery ?? 1}
          paginationHandler={paginationHandler}
        />
      </>
    );
  }

  return (
    <div className={classes.account__all__products__container}>
      <h3 className={classes.account__all__products__title}>All Products</h3>
      {content}
    </div>
  );
}

export default AccountAllProducts;

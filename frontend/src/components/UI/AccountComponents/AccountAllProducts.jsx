import classes from "./AccountAllProducts.module.css";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../../util/requests";

import AccountProductCard from "./AccountProductCard";

import Placeholder from "../Others/Placeholder";
import Pagination from "../Others/Pagination";

function AccountAllProducts() {
  const [maxPage, setMaxPage] = useState(0);
  const [visibleProductsCount, setVisibleProductsCount] = useState(1);
  const [deletedProductsCount, setDeletedProductsCount] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParams]);

  const searchParamsObject = Object.fromEntries(searchParams);
  const searchParamsEntriesAll = Object.entries(searchParamsObject);

  const { page: pageQuery } = searchParamsObject;
  const pageQueryNumber = Number(pageQuery);

  useEffect(() => {
    if (
      deletedProductsCount === visibleProductsCount &&
      maxPage === pageQueryNumber &&
      maxPage !== 1
    ) {
      setSearchParams((prevParams) => {
        const prevParamsObject = Object.fromEntries(prevParams);

        if (maxPage === 2) {
          delete prevParamsObject.page;

          return {
            ...prevParamsObject,
          };
        }

        return {
          ...prevParamsObject,
          page: pageQueryNumber - 1,
        };
      });

      setDeletedProductsCount(0);
    }
  }, [maxPage, visibleProductsCount, deletedProductsCount, pageQuery]);

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

  useEffect(() => {
    setMaxPage(data?.data.maxPages);
  }, [data]);

  useEffect(() => {
    if (maxPage === Number(pageQuery)) {
      setVisibleProductsCount(data?.data.data.length);
    }
  }, [maxPage]);

  let content;

  if (isPending) {
    content = <Placeholder type="loading" />;
  }

  if (isError) content = <Placeholder type="error" message={error.message} />;

  if (data && data.data.data.length <= 0) {
    content = (
      <span className={classes.account__all__products__no__results}>
        There were no products found
      </span>
    );
  }

  if (data && data.data.data.length > 0) {
    content = (
      <>
        <div className={classes.account__all__products__list}>
          {data.data.data.map((product) => {
            return (
              <AccountProductCard
                key={product._id}
                product={product}
                queryString={queryString}
                onDelete={setDeletedProductsCount}
              />
            );
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

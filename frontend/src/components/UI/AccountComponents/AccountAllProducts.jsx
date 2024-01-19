import classes from "./AccountAllProducts.module.css";

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../../util/requests";

import AccountProductCard from "./AccountProductCard";
import AccountAllProductsPagination from "./AccountAllProductsPagination";

import Placeholder from "../Others/Placeholder";

function AccountAllProducts() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParams]);

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

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["adminProducts"],
    queryFn: ({ signal }) => fetchProducts(signal),
  });

  let content;

  if (isPending) content = <Placeholder type="loading" />;

  if (isError) content = <Placeholder type="error" message={error.message} />;

  if (data) console.log(data);

  return (
    <div className={classes.account__all__products__container}>
      <h3 className={classes.account__all__products__title}>All Products</h3>
      {content}
    </div>
  );
}

export default AccountAllProducts;

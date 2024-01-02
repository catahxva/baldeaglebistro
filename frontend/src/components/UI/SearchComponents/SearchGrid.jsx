import classes from "./SearchGrid.module.css";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../../util/requests";

import Placeholder from "../Others/Placeholder";
import ProductCard from "../Others/ProductCard";

function SearchGrid({ query }) {
  const queryString = `?search=${query}`;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["searchResults", query],
    queryFn: ({ signal }) => fetchProducts(signal, queryString),
  });

  let content;

  if (isPending) content = <Placeholder type="loading" />;

  if (isError) content = <Placeholder type="error" message={error.message} />;

  if (data && data.data.data.length <= 0)
    content = (
      <span className={classes.search__grid__message}>
        No products found for your query
      </span>
    );

  if (data && data.data.data.length > 0) {
    const products = data.data.data;

    content = (
      <div className={classes.search__grid__grid}>
        {products.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
    );
  }

  return <div className={classes.search__grid__container}>{content}</div>;
}

export default SearchGrid;

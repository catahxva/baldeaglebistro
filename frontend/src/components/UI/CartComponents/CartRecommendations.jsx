import classes from "./CartRecommendations.module.css";

import { useQuery } from "@tanstack/react-query";

import { fetchProducts } from "../../../util/requests";

import Placeholder from "../Others/Placeholder";
import CartRecommendationItem from "./CartRecommendationItem";

function CartRecommendations({ typeOfProduct }) {
  console.log(typeOfProduct);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["recommendedProducts", typeOfProduct],
    queryFn: ({ signal }) =>
      fetchProducts(signal, `?category=${typeOfProduct}&limit=3`),
  });

  let content;

  if (isPending) content = <Placeholder type="loading" size="small" />;

  if (isError) content = <Placeholder type="error" message={error.message} />;

  if (data) {
    const items = data.data.data;

    content = (
      <div className={classes.cart__rec}>
        <h3 className={classes.cart__rec__title}>
          {typeOfProduct === "beverage"
            ? "Suggested Drinks"
            : "Suggested Desserts"}
        </h3>
        <div className={classes.cart__rec__container__items}>
          {items.map((item) => {
            return <CartRecommendationItem key={item._id} item={item} />;
          })}
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
}

export default CartRecommendations;

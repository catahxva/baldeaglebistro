import classes from "./CheckoutItemsList.module.css";

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { obtainCartProducts } from "../../../util/requests";

import CheckoutItem from "./CheckoutItem";
import Placeholder from "../Others/Placeholder";

function CheckoutItemsList() {
  const cartItems = useSelector((state) => state.cart.items);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["checkoutItems", cartItems],
    queryFn: () => obtainCartProducts(cartItems),
  });

  let content;

  if (isPending) content = <Placeholder type="loading" size="small" />;

  if (isError)
    content = <Placeholder type="error" message={error.message} size="small" />;

  if (data) {
    const items = data.data.data;

    const availableItems = items.filter(
      (item) =>
        item.notFound === undefined &&
        item.notAvailable === undefined &&
        item.error === undefined
    );

    const totalPrice = availableItems.reduce(
      (acc, current) => acc + current.price,
      0
    );

    content = (
      <>
        <div className={classes.checkout__list}>
          {availableItems.map((item) => {
            return <CheckoutItem key={item.id} item={item} />;
          })}
        </div>
        <div className={classes.checkout__container__total}>
          <span className={classes.checkout__total}>Total: {totalPrice}$</span>
        </div>
      </>
    );
  }

  return <div>{content}</div>;
}

export default CheckoutItemsList;

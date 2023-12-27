import classes from "./CartList.module.css";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { obtainCartProducts } from "../../../util/requests";

import CartListItem from "./CartListItem";
import CartRecommendations from "./CartRecommendations";

function CartList() {
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    setInitialLoad(true);
  }, []);

  const cartItems = useSelector((state) => state.cart.items);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["cartItems", cartItems],
    queryFn: () => obtainCartProducts(cartItems),
  });

  let content;

  if (data) {
    const cartItemsDB = data.data.data;

    const availableItems = cartItemsDB.filter(
      (item) =>
        item.notFound === undefined &&
        item.notAvailable === undefined &&
        item.error === undefined
    );

    const unavailableItems = cartItemsDB.filter(
      (item) =>
        item.notFound === true &&
        item.notAvailable === true &&
        item.error === true
    );

    const unavailableItemsMessage =
      unavailableItems.length > 0
        ? "Some of the items inside your cart are unavailable so they have been removed"
        : "";

    console.log(availableItems);

    content = (
      <div className={classes.cart__list__grid}>
        <div>
          {unavailableItemsMessage && (
            <span className={classes.cart__list__message}>
              {unavailableItemsMessage}
            </span>
          )}
          {availableItems.map((item) => {
            return <CartListItem key={item.id} item={item} />;
          })}
        </div>
        <div>
          <CartRecommendations />
          <CartRecommendations />
          <div className={classes.cart__list__container__total}></div>
        </div>
      </div>
    );
  }
  if (isError) console.log(error);

  return (
    <section className="section__min__height">
      <h2>Your cart</h2>
      {content}
    </section>
  );
}

export default CartList;

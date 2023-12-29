import classes from "./CartList.module.css";

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { obtainCartProducts } from "../../../util/requests";

import { cartActions } from "../../../store/cartSlice";

import CartListItem from "./CartListItem";
import CartRecommendations from "./CartRecommendations";
import Placeholder from "../Others/Placeholder";
import ButtonLink from "../Others/ButtonLink";

function CartList() {
  const isInitialLoad = useRef(true);

  useEffect(() => {
    isInitialLoad.current = false;
  }, []);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const unavailableCartItems = useSelector(
    (state) => state.cart.unavailableItems
  );

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["cartItems", cartItems],
    queryFn: () => obtainCartProducts(cartItems),
  });

  let content;

  if (isPending && isInitialLoad.current)
    content = <Placeholder type="loading" size="big" />;

  if (isError)
    content = <Placeholder type="error" message={error.message} size="big" />;

  if (data && data.data.data.length <= 0) {
    content = (
      <div>
        <span className={classes.cart__list__message}>
          You have no items in your shopping cart.
        </span>
      </div>
    );
  }

  if (data && data.data.data.length > 0) {
    const cartItemsDB = data.data.data;

    const availableItems = cartItemsDB.filter(
      (item) =>
        item.notFound === undefined &&
        item.notAvailable === undefined &&
        item.error === undefined
    );

    const totalPrice = availableItems.reduce(
      (acc, current) => acc + current.price,
      0
    );

    const noDrink =
      availableItems.filter((item) => item.category === "beverage").length <= 0;

    const noDessert =
      availableItems.filter((item) => item.category === "dessert").length <= 0;

    const unavailableItems = cartItemsDB.filter(
      (item) =>
        item.notFound === true ||
        item.notAvailable === true ||
        item.error === true
    );

    dispatch(cartActions.addProductToUnavailableList({ unavailableItems }));

    const unavailableItemsMessage =
      unavailableCartItems.length > 0
        ? "Some of the items inside your cart are unavailable so they have been removed"
        : "";

    unavailableItems.forEach((item) => {
      dispatch(cartActions.removeProduct({ id: item.itemId }));
    });

    content = (
      <div className={classes.cart__list__grid}>
        <div>
          {unavailableItemsMessage && (
            <span className={classes.cart__list__message}>
              {unavailableItemsMessage}
            </span>
          )}
          <div className={classes.cart__list__container__items}>
            {availableItems.map((item) => {
              return <CartListItem key={item.id} item={item} />;
            })}
          </div>
          <div className={classes.cart__list__container__total}>
            <span className={classes.cart__list__total}>
              Total: {totalPrice}$
            </span>
            <ButtonLink path="/checkout" className="big__button">
              Checkout
            </ButtonLink>
          </div>
        </div>
        <div>
          {noDrink && <CartRecommendations typeOfProduct="beverage" />}
          {noDessert && <CartRecommendations typeOfProduct="dessert" />}
        </div>
      </div>
    );
  }

  return (
    <section className="section__min__height">
      <h2>Your cart</h2>
      {content}
    </section>
  );
}

export default CartList;

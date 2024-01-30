import classes from "./CartList.module.css";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { obtainCartProducts } from "../../../util/requests";
import { processCartData } from "../../../util/otherFunctions";

import CartListItem from "./CartListItem";
import CartRecommendations from "./CartRecommendations";
import Placeholder from "../Others/Placeholder";
import ButtonLink from "../Others/ButtonLink";

function CartList() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const unavailableItems = useSelector((state) => state.cart.unavailableItems);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["cartItems", cartItems],
    queryFn: () => obtainCartProducts(cartItems),
  });

  let content;

  if (isPending) content = <Placeholder type="loading" size="big" />;

  if (isError)
    content = <Placeholder type="error" message={error.message} size="big" />;

  if (data && data.data.data.length <= 0 && unavailableItems.length <= 0) {
    content = (
      <div>
        <span className={classes.cart__list__message}>
          You have no items in your shopping cart.
        </span>
      </div>
    );
  }

  if (data && data.data.data.length <= 0 && unavailableItems.length > 0) {
    content = (
      <div>
        <span className={classes.cart__list__message}>
          The items inside your cart have been removed because they are
          currently unavailable.
        </span>
      </div>
    );
  }

  if (data && data.data.data.length > 0) {
    const {
      availableItems,
      totalPrice,
      noDrink,
      noDessert,
      unavailableItemsMessage,
    } = processCartData(data.data.data, unavailableItems, dispatch);

    content = (
      <div className={classes.cart__list__grid}>
        <div>
          {unavailableItemsMessage && unavailableItems.length > 0 && (
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

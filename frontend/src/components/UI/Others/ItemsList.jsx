import classes from "./ItemsList.module.css";

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { obtainCartProducts } from "../../../util/requests";
import { processCartData } from "../../../util/otherFunctions";

import Item from "./Item";
import Placeholder from "./Placeholder";

function ItemsList() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const unavailableItems = useSelector((state) => state.cart.unavailableItems);

  const deliveryType = useSelector((state) => state.address.carrier);

  let deliveryPrice;

  if (deliveryType === "deliveryStandard") deliveryPrice = 5;
  if (deliveryType === "deliveryExpress") deliveryPrice = 10;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["checkoutItems", cartItems],
    queryFn: () => obtainCartProducts(cartItems),
  });

  let content;

  if (isPending) content = <Placeholder type="loading" size="small" />;

  if (isError)
    content = <Placeholder type="error" message={error.message} size="small" />;

  if (data) {
    const { availableItems, totalPrice, unavailableItemsMessage } =
      processCartData(data.data.data, unavailableItems, dispatch);

    content = (
      <>
        {unavailableItemsMessage && (
          <span className={classes.unavailable__span}>
            {unavailableItemsMessage}
          </span>
        )}
        <div className={classes.list}>
          {availableItems.map((item) => {
            return <Item key={item.id} item={item} />;
          })}
        </div>
        <div className={classes.container__total}>
          {deliveryType && (
            <span className={classes.delivery__fee}>
              Delivery: {deliveryPrice}$
            </span>
          )}
          <span className={classes.total}>
            Total: {deliveryType ? totalPrice + deliveryPrice : totalPrice}$
          </span>
        </div>
      </>
    );
  }

  return <div className={classes.items__list}>{content}</div>;
}

export default ItemsList;

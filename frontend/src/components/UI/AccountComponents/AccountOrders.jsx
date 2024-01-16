import classes from "./AccountOrders.module.css";

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../../../util/requests";

import Placeholder from "../Others/Placeholder";
import ButtonLink from "../Others/ButtonLink";

function AccountOrders() {
  const userToken = useSelector((state) => state.auth.token);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["userOrders", userToken],
    queryFn: ({ signal }) => getUserOrders(signal, userToken),
  });

  let content;

  if (isPending) content = <Placeholder type="loading" />;

  if (data) console.log(data);

  if (data && data.data.data.length <= 0)
    content = (
      <span className={classes.account__orders__span__none}>
        You don't have any orders yet
      </span>
    );

  if (isError) content = <Placeholder type="error" message={error.message} />;

  if (data && data.data.data.length > 0) {
    const orders = data.data.data;

    console.log(orders);

    content = (
      <div className={classes.account__orders__list}>
        {orders.map((order) => {
          return (
            <div className={classes.account__order}>
              <div>
                <span className={classes.account__order__title}>
                  Order #{order._id.slice(-6).toUpperCase()}
                </span>
                <span className={classes.account__order__date}>
                  {new Date(order.timeStamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div>
                <span className={classes.account__order__span}>
                  Products:{" "}
                  {order.products.reduce(
                    (acc, product) => acc + product.productQuantity,
                    0
                  )}
                </span>
                <span className={classes.account__order__span}>
                  Paid: {order.total}$
                </span>
              </div>
              <div>
                <span className={classes.account__order__span}>Pending</span>
              </div>
              <button className={classes.account__order__btn}>Re-do</button>
              <ButtonLink path={`/order/${order._id}`} classNames="big__button">
                See Order
              </ButtonLink>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={classes.account__orders}>
      <h3 className={classes.account__orders__title}>Your orders</h3>
      {content}
    </div>
  );
}

export default AccountOrders;

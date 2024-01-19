import classes from "./AccountOrders.module.css";

import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../../../util/requests";
import { redoOrder } from "../../../store/cartActions";

import Placeholder from "../Others/Placeholder";
import ButtonLink from "../Others/ButtonLink";

function AccountOrders() {
  const dispatch = useDispatch();
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
          console.log(order);

          return (
            <div className={classes.account__order} key={order._id}>
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
                <span className={classes.account__order__span}>
                  {order.status}
                </span>
              </div>
              <div className={classes.account__order__container__btns}>
                <button
                  onClick={() => {
                    dispatch(redoOrder(order.products));
                  }}
                  className={classes.account__order__btn}
                >
                  Re-do
                </button>
                <ButtonLink
                  path={`/order/${order._id}`}
                  className="big__button"
                >
                  See Order
                </ButtonLink>
              </div>
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

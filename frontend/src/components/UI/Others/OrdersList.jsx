import classes from "./OrdersList.module.css";

import { useDispatch } from "react-redux";
import { redoOrder } from "../../../store/cartActions";

import ButtonLink from "./ButtonLink";

function OrdersList({ orders, listType }) {
  const dispatch = useDispatch();

  return (
    <div className={classes.orders__list}>
      {orders.map((order) => {
        return (
          <div className={classes.order} key={order._id}>
            <div className={classes.order__big__width__container}>
              <span className={classes.order__title}>
                Order #{order._id.slice(-6).toUpperCase()}
              </span>
              <span className={classes.order__date}>
                {new Date(order.timeStamp).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div>
              <span className={classes.order__span}>
                Products:{" "}
                {order.products.reduce(
                  (acc, product) => acc + product.productQuantity,
                  0
                )}
              </span>
              <span className={classes.order__span}>Paid: {order.total}$</span>
            </div>
            <div>
              <span className={classes.order__span}>{order.status}</span>
            </div>
            <div className={classes.order__container__btns}>
              {listType !== "all" && (
                <button
                  onClick={() => {
                    dispatch(redoOrder(order.products));
                  }}
                  className={classes.order__btn}
                >
                  Re-do
                </button>
              )}
              <ButtonLink path={`/order/${order._id}`} className="big__button">
                See Order
              </ButtonLink>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrdersList;

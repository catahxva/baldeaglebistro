import classes from "./OrderContent.module.css";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { redoOrder } from "../../../store/cartActions";
import { useQuery } from "@tanstack/react-query";
import { fetchOrder } from "../../../util/requests";

import OrderInfo from "./OrderInfo";
import OrderGrid from "./OrderGrid";

import Placeholder from "../Others/Placeholder";

function OrderContent() {
  const userRole = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["order", id],
    queryFn: ({ signal }) => fetchOrder(signal, id),
  });

  let content;

  if (isPending) content = <Placeholder type="loading" />;

  if (isError) content = <Placeholder type="error" message={error.message} />;

  if (data) {
    const order = data.data.data;
    const products = order.products;

    content = (
      <>
        <OrderInfo order={order} />
        <OrderGrid products={products} />
        <div className={classes.order__content__container}>
          {userRole === "admin" && (
            <select className={classes.order__content__select}>
              <option value="">Select</option>
            </select>
          )}
          <button
            onClick={() => {
              dispatch(redoOrder(products));
            }}
            className={classes.order__content__redo}
          >
            Re-do order
          </button>
        </div>
      </>
    );
  }

  return (
    <section className="first__section section__min__height">
      <h2>Order #{id.slice(-6).toUpperCase()}</h2>
      {content}
    </section>
  );
}

export default OrderContent;

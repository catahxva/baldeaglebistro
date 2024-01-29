import classes from "./OrderContent.module.css";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { redoOrder } from "../../../store/cartActions";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchOrder, updateOrder } from "../../../util/requests";

import OrderInfo from "./OrderInfo";
import OrderGrid from "./OrderGrid";

import Placeholder from "../Others/Placeholder";

function OrderContent() {
  const userToken = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [edit, setEdit] = useState();
  const [submitting, setSubmitting] = useState();

  const { mutate } = useMutation({
    mutationFn: updateOrder,
    onMutate: () => {
      setSubmitting(true);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      setSubmitting(false);
      console.log(data);
    },
  });

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

    console.log(order);
    console.log(products);

    const selectHandler = function (e) {
      const value = e.target.value;

      mutate({ token: userToken, id: order._id, status: value });
    };

    content = (
      <>
        <OrderInfo order={order} />
        <OrderGrid products={products} />
        <div className={classes.order__content__container}>
          {userRole === "admin" && (
            <div className={classes.order__content__container__select}>
              <label className={classes.order__content__label}>
                Order Status:
              </label>
              <div className={classes.order__content__helper__container}>
                {!edit && (
                  <>
                    <span className={classes.order__content__span}>
                      {order.status}
                    </span>
                  </>
                )}
                {edit && (
                  <select
                    onChange={selectHandler}
                    className={classes.order__content__select}
                  >
                    <option value="">Select</option>
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                  </select>
                )}
                <button
                  onClick={() => setEdit((prevState) => !prevState)}
                  className={classes.order__content__edit__btn}
                >
                  {!submitting && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-6 h-6 ${classes.order__content__edit__btn__svg}`}
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                    </svg>
                  )}
                  {submitting && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-6 h-6 ${classes.order__content__edit__btn__svg} ${classes.order__content__edit__btn__svg__spinning}`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
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
      <p>
        Please note that only products which still exist inside of our database
        will be displayed inside of your order.
      </p>
      {content}
    </section>
  );
}

const paginate = function (array, pageNumber, itemsPerPage) {};

export default OrderContent;

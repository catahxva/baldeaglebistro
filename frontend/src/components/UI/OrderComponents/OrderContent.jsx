import classes from "./OrderContent.module.css";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/uiSlice";
import { redoOrder } from "../../../store/cartActions";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchOrder, updateOrder } from "../../../util/requests";

import OrderInfo from "./OrderInfo";
import OrderGrid from "./OrderGrid";

import Placeholder from "../Others/Placeholder";
import SelectUpdate from "../Others/SelectUpdate";

function OrderContent() {
  const userToken = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [edit, setEdit] = useState();
  const [submitting, setSubmitting] = useState();
  const [updatedOrder, setUpdatedOrder] = useState();

  const { mutate } = useMutation({
    mutationFn: updateOrder,
    onMutate: () => {
      setSubmitting(true);
    },
    onError: (error) => {
      setEdit(false);

      dispatch(
        uiActions.showNotification({
          status: "error",
          message: error.message,
        })
      );
    },
    onSuccess: (data) => {
      setUpdatedOrder(data.data.data);
      setEdit(false);

      dispatch(
        uiActions.showNotification({
          status: "success",
          message: data.message,
        })
      );
    },
    onSettled: () => {
      setSubmitting(false);

      setTimeout(() => {
        dispatch(uiActions.hideNotification());
      }, 4000);
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

    let orderStatus;

    if (updatedOrder === undefined) {
      orderStatus = order.status;
    }

    if (updatedOrder !== undefined) {
      orderStatus = updatedOrder;
    }

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
              <SelectUpdate
                edit={edit}
                setEdit={setEdit}
                spanText={orderStatus}
                selectHandler={selectHandler}
                submitting={submitting}
                type="status"
              />
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

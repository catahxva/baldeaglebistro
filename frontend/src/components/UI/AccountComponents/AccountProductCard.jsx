import classes from "./AccountProductCard.module.css";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../../store/uiSlice";
import { useMutation } from "@tanstack/react-query";
import { deleteProduct, updateProduct } from "../../../util/requests";

import { queryClient } from "../../../util/queryClient";

import AccountProductModal from "./AccountProductModal";

import SelectUpdate from "../Others/SelectUpdate";

function AccountProductCard({ product, queryString, onDelete }) {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.auth.token);

  const [updatingProduct, setUpdatingProduct] = useState();
  const [updatedProduct, setUpdatedProduct] = useState();

  let productAvailability;

  if (updatedProduct === undefined) {
    productAvailability = product.available ? "Available" : "Unavailable";
  }

  if (updatedProduct !== undefined) {
    productAvailability = updatedProduct ? "Available" : "Unavailable";
  }

  const [submitting, setSubmitting] = useState();
  const btnText = submitting ? "Deleting..." : "Delete";

  const [deleteError, setDeleteError] = useState();

  const [edit, setEdit] = useState(false);
  const [activeModal, setActiveModal] = useState(false);

  const helperArray = new Array(5).fill(0);

  const { mutate: updateProd } = useMutation({
    mutationFn: updateProduct,
    onMutate: () => {
      setUpdatingProduct(true);
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
      setUpdatedProduct(data.data.data);
      setEdit(false);

      dispatch(
        uiActions.showNotification({
          status: "success",
          message: data.message,
        })
      );
    },
    onSettled: () => {
      setUpdatingProduct(false);

      setTimeout(() => {
        dispatch(uiActions.hideNotification());
      }, 4000);
    },
  });

  const { mutate: deleteProd } = useMutation({
    mutationFn: deleteProduct,
    onMutate: () => {
      setSubmitting(true);
    },
    onError: (error) => {
      setDeleteError(error.message);
    },
    onSuccess: () => {
      setActiveModal(false);

      onDelete((prevState) => prevState + 1);

      queryClient.invalidateQueries(["adminProducts", queryString]);
    },
    onSettled: () => {
      setSubmitting(false);
    },
  });

  const selectHandler = function (e) {
    const value = e.target.value;

    updateProd({
      id: product._id,
      availability: value,
      token: userToken,
    });
  };

  return (
    <>
      {activeModal && (
        <AccountProductModal
          closeModal={setActiveModal}
          deleteProduct={deleteProd}
          id={product._id}
          error={deleteError}
          btnText={btnText}
        />
      )}
      <div className={classes.account__product__card}>
        <div className={classes.account__product__card__grid}>
          <div className={classes.account__product__card__container}>
            <div className={classes.account__product__card__container__img}>
              <img
                src={product.image}
                className={classes.account__product__card__img}
              />
            </div>
            <span className={classes.account__product__card__title}>
              {product.name}
            </span>
            <span className={classes.account__product__card__category}>
              {product.category
                .split(" ")
                .map((str) => str[0].toUpperCase() + str.slice(1))
                .join(" ")}
            </span>
            <span className={classes.account__product__card__price}>
              {product.price}$ / serving
            </span>
          </div>
          <div className={classes.account__product__card__container}>
            <span className={classes.account__product__card__sales}>
              Sales: {product.orderCount}
            </span>
            <div className={classes.account__product__card__container__rating}>
              {helperArray.map((el, i) => {
                return (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-6 h-6 ${
                      classes.account__product__card__star
                    } ${
                      i + 1 <= product.rating
                        ? classes.account__product__card__star__active
                        : ""
                    }`}
                    key={i}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                );
              })}
            </div>
            <p>{product.description}</p>
            <div className={classes.account__product__card__nutrition}>
              {Object.entries(product.nutrition).map((entry, i) => {
                return (
                  <div
                    key={i}
                    className={classes.account__product__card__nutrition__row}
                  >
                    <span
                      className={
                        classes.account__product__card__nutrition__row__key
                      }
                    >
                      {entry[0]}
                    </span>
                    <span
                      className={
                        classes.account__product__card__nutrition__row__value
                      }
                    >
                      {entry[1]}
                      {entry[0] === "calories" ? "" : "g"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={classes.account__product__card__controls}>
          <div className={classes.account__product__card__availability}>
            <span className={classes.account__product__card__span}>
              Availablity:{" "}
            </span>
            <SelectUpdate
              edit={edit}
              setEdit={setEdit}
              spanText={productAvailability}
              selectHandler={selectHandler}
              submitting={updatingProduct}
              type="availability"
            />
          </div>
          <button
            onClick={() => setActiveModal(true)}
            className={classes.account__product__card__button__delete}
          >
            Delete Product
          </button>
        </div>
      </div>
    </>
  );
}

export default AccountProductCard;

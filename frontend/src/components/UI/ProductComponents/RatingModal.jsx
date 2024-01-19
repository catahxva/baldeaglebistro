import classes from "./RatingModal.module.css";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { sendRating } from "../../../util/requests";

function RatingModal({ active, closeModal, id }) {
  const userToken = useSelector((state) => state.auth.token);

  const [submitting, setSubmitting] = useState();
  const btnText = !submitting ? "Rate" : "Submitting...";

  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const [activeIndex, setActiveIndex] = useState(undefined);
  const hasRated = activeIndex !== undefined ? true : false;

  const utilityArray = new Array(5).fill(0);

  const { mutate } = useMutation({
    mutationFn: sendRating,
    onMutate: () => {
      setSubmitting(true);
    },
    onSuccess: (message) => {
      setMessage(message);
      setMessageType("sucess");
    },
    onError: (error) => {
      setMessage(error.message);
    },
    onSettled: () => {
      setSubmitting(false);
    },
  });

  return (
    <div
      className={`${classes.rating__modal} ${
        active ? classes.rating__modal__active : ""
      }`}
    >
      <div className={classes.rating__modal__interior}>
        {!message && (
          <div
            className={`${classes.rating__modal__container__stars} ${
              hasRated ? classes.rating__modal__container__stars__active : ""
            } ${
              hasRated ? classes.rating__modal__container__stars__disabled : ""
            }`}
          >
            {utilityArray.map((el, i) => {
              return (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-6 h-6 ${classes.rating__modal__star} ${
                    hasRated && activeIndex === i
                      ? classes.rating__modal__star__active
                      : ""
                  } ${hasRated ? classes.rating__modal__star__disabled : ""}`}
                  onClick={() => setActiveIndex(i)}
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
        )}
        {message && (
          <span
            className={`${classes.rating__modal__message} ${
              messageType === "success"
                ? classes.rating__modal__message__success
                : ""
            }`}
          >
            {message}
          </span>
        )}
        <div className={classes.rating__modal__container__btns}>
          <div className={classes.rating__modal__container__small__btns}>
            <button
              className={classes.rating__modal__big__btn}
              onClick={() => setActiveIndex(undefined)}
            >
              Reset
            </button>
            <button
              className={`${classes.rating__modal__big__btn} ${classes.rating__modal__big__btn__rating}`}
              disabled={submitting}
              onClick={() => {
                mutate({ token: userToken, id, rating: activeIndex + 1 });
              }}
            >
              {btnText}
            </button>
          </div>
          <button
            className={`${classes.rating__modal__close__btn}`}
            onClick={() => {
              closeModal(false);
              setMessage(undefined);
              setMessageType(undefined);
              setActiveIndex(undefined);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default RatingModal;

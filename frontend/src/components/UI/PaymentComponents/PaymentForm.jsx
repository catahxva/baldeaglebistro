import classes from "./PaymentForm.module.css";

import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

function PaymentForm({ total }) {
  const stripe = useStripe();
  const elements = useElements();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const btnText = isSubmitting ? "Submitting..." : "Pay Now";

  const submitHandler = async function (e) {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsSubmitting(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-success`,
      },
    });

    if (error) setIsError(error.message);

    setIsSubmitting(false);
  };

  return (
    <form className={classes.payment__form} onSubmit={submitHandler}>
      <p className={classes.payment__p}>
        Please remember this is a project website, use the card number of 4242
        4242 4242 4242, with expiration date 04/24 and CVC of 424.
      </p>
      <PaymentElement />
      <div className={classes.payment__form__container}>
        <span className={classes.payment__form__total}>Amount: {total}$</span>
        <button
          disabled={isSubmitting}
          className={classes.payment__form__button}
        >
          {btnText}
        </button>
      </div>
      {isError && (
        <span className={classes.payment__form__error}>{isError}</span>
      )}
    </form>
  );
}

export default PaymentForm;

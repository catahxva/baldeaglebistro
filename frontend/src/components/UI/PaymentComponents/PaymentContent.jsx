import classes from "./PaymentContent.module.css";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { obtainPaymentIntent } from "../../../util/requests";

import { Elements } from "@stripe/react-stripe-js";

import Placeholder from "../Others/Placeholder";
import PaymentForm from "./PaymentForm";
import ItemsList from "../Others/ItemsList";

function PaymentContent() {
  const userToken = useSelector((state) => state.auth.token);
  const currentAddress = useSelector((state) => state.address.address);
  const items = useSelector((state) => state.cart.items);

  const stripePromise = loadStripe(
    "pk_test_51OOl2QJARixY9PYyXaY0yHScCQVrdAhNUwdk0tZtjH8G3K6yehOqBQx1pSBCAiMxvxN2iziWeiGruEQP93IUOdvP00titFkNZs"
  );

  const [clientSecret, setClientSecret] = useState();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["paymentIntent", { currentAddress, items }],
    queryFn: ({ signal }) =>
      obtainPaymentIntent(signal, currentAddress, items, userToken),
  });

  useEffect(() => {
    if (data) setClientSecret(data.clientSecret);
  }, [data]);

  return (
    <section className="section__min__height">
      <h2>Payment</h2>
      <div className={classes.payment__content__grid}>
        <div className={classes.payment__content__grid__container}>
          {isPending && <Placeholder type="loading" />}
          {isError && <Placeholder type="error" message={error.message} />}
          {stripePromise && clientSecret && data && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm total={data.totalAmount} />
            </Elements>
          )}
        </div>
        <div className={classes.payment__content__grid__container}>
          <ItemsList />
        </div>
      </div>
    </section>
  );
}

export default PaymentContent;

import classes from "./CheckoutContent.module.css";

import CheckoutForm from "./CheckoutForm";

import ItemsList from "../Others/ItemsList";

function CheckoutContent() {
  return (
    <section>
      <h2>Checkout</h2>
      <div className={classes.checkout__content__grid}>
        <CheckoutForm />
        <ItemsList />
      </div>
    </section>
  );
}

export default CheckoutContent;

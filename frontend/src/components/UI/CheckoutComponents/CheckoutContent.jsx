import classes from "./CheckoutContent.module.css";

import CheckoutForm from "./CheckoutForm";
import CheckoutItemsList from "./CheckoutItemsList";

function CheckoutContent() {
  return (
    <section>
      <h2>Checkout</h2>
      <div className={classes.checkout__content__grid}>
        <CheckoutForm />
        <CheckoutItemsList />
      </div>
    </section>
  );
}

export default CheckoutContent;

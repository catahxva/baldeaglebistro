import classes from "./CheckoutContent.module.css";

import CheckoutForm from "./CheckoutForm";
import CheckoutItemsList from "./CheckoutItemsList";

function CheckoutContent() {
  return (
    <section className={classes.checkout__content__grid}>
      <CheckoutForm />
      <CheckoutItemsList />
    </section>
  );
}

export default CheckoutContent;

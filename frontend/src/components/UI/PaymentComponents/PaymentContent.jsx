import classes from "./PaymentContent.module.css";

import ItemsList from "../Others/ItemsList";

function PaymentContent() {
  return (
    <section className="section__min__height">
      <h2>Payment</h2>
      <ItemsList />
    </section>
  );
}

export default PaymentContent;

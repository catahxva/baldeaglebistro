import classes from "./OrderSuccessContent.module.css";

import ButtonLink from "../Others/ButtonLink";

function OrderSuccessContent() {
  return (
    <section>
      <div className={classes.order__success__container}>
        <span className={classes.order__success__message}>
          Your order has been successful!
        </span>
        <div className={classes.order__success__btn__container}>
          <ButtonLink className="big__button">See order</ButtonLink>
          <ButtonLink path="/" className="big__button">
            Home Page
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export default OrderSuccessContent;

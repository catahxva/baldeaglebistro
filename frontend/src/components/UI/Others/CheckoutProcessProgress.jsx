import classes from "./CheckoutProcessProgress.module.css";

import { Link } from "react-router-dom";

function CheckoutProcessProgress({ stage }) {
  return (
    <section className="first__section smaller__padding">
      <div className={classes.progress__container}>
        <Link
          to="/cart"
          className={`${classes.progress__step} ${
            stage === "cart" || stage === "checkout" || stage === "payment"
              ? classes.progress__step__active
              : ""
          }`}
        >
          <span className={classes.progress__step__span}>1</span>
        </Link>
        <div
          className={`${classes.progress__filler} ${
            stage === "checkout" || stage === "payment"
              ? classes.progress__filler__active
              : ""
          }`}
        ></div>
        <Link
          to="/checkout"
          className={`${classes.progress__step} ${
            stage === "checkout" || stage === "payment"
              ? classes.progress__step__active
              : ""
          }`}
        >
          <span className={classes.progress__step__span}>2</span>
        </Link>
        <div
          className={`${classes.progress__filler} ${
            stage === "payment" ? classes.progress__filler__active : ""
          }`}
        ></div>
        <Link
          to="/payment"
          className={`${classes.progress__step} ${
            stage === "payment" ? classes.progress__step__active : ""
          }`}
        >
          <span className={classes.progress__step__span}>3</span>
        </Link>
      </div>
    </section>
  );
}

export default CheckoutProcessProgress;

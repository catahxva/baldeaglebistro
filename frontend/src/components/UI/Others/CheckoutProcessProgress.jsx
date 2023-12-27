import classes from "./CheckoutProcessProgress.module.css";

function CheckoutProcessProgress({ stage }) {
  return (
    <section className="first__section smaller__padding">
      <div className={classes.progress__container}>
        <div
          className={`${classes.progress__step} ${
            stage === "cart" || stage === "checkout" || stage === "payment"
              ? classes.progress__step__active
              : ""
          }`}
        >
          <span className={classes.progress__step__span}>1</span>
        </div>
        <div
          className={`${classes.progress__filler} ${
            stage === "checkout" || stage === "payment"
              ? classes.progress__filler__active
              : ""
          }`}
        ></div>
        <div
          className={`${classes.progress__step} ${
            stage === "checkout" || stage === "payment"
              ? classes.progress__step__active
              : ""
          }`}
        >
          <span className={classes.progress__step__span}>2</span>
        </div>
        <div
          className={`${classes.progress__filler} ${
            stage === "payment" ? classes.progress__filler__active : ""
          }`}
        ></div>
        <div
          className={`${classes.progress__step} ${
            stage === "payment" ? classes.progress__step__active : ""
          }`}
        >
          <span className={classes.progress__step__span}>3</span>
        </div>
      </div>
    </section>
  );
}

export default CheckoutProcessProgress;

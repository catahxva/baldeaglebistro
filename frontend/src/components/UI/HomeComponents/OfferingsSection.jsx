import classes from "./OfferingsSection.module.css";

import ButtonLink from "../Others/ButtonLink";

function OfferingsSection() {
  return (
    <section>
      <h2>Offerings</h2>
      <div className={classes.offerings__grid}>
        <div className={classes.offerings__card}>
          <div className={classes.offerings__card__info}>
            <h3 className={classes.offerings__card__title}>Main Dishes</h3>
            <p></p>
          </div>
        </div>
        {/* <div className={classes.offerings__card}></div> */}
        {/* <div className={classes.offerings__card}></div> */}
      </div>
      <div className={classes.offerings__container__cta}>
        <ButtonLink className="big__button">All Offerings</ButtonLink>
      </div>
    </section>
  );
}

export default OfferingsSection;

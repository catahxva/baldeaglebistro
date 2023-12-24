import classes from "./OfferingsSection.module.css";

import ButtonLink from "../Others/ButtonLink";

function OfferingsSection() {
  return (
    <section>
      <h2>Offerings</h2>
      <div className={classes.offerings__grid}>
        <div className={classes.offerings__card}>
          <img
            src="/img/main-dish.jpg"
            className={classes.offerings__card__img}
          />
          <div className={classes.offerings__card__info}>
            <h3 className={classes.offerings__card__title}>Main Dishes</h3>
            <p className={classes.offerings__card__text}>
              Experience the diverse flavors of America with our hearty main
              dishes, featuring juicy grilled options, slow-cooked delights, and
              savory cuts that capture the essence of culinary excellence.
            </p>
            <ButtonLink className="small__button">See More</ButtonLink>
          </div>
        </div>
        <div className={classes.offerings__card}>
          <img src="/img/side.jpg" className={classes.offerings__card__img} />
          <div className={classes.offerings__card__info}>
            <h3 className={classes.offerings__card__title}>Sides</h3>
            <p className={classes.offerings__card__text}>
              Elevate your meal with classic American sides, from crispy golden
              fries to creamy mac 'n' cheese, each enhancing your dining
              experience with a burst of flavor and texture.
            </p>
            <ButtonLink className="small__button">See More</ButtonLink>
          </div>
        </div>
        <div className={classes.offerings__card}>
          <img
            src="/img/dessert.jpg"
            className={classes.offerings__card__img}
          />
          <div className={classes.offerings__card__info}>
            <h3 className={classes.offerings__card__title}>Desserts</h3>
            <p className={classes.offerings__card__text}>
              Conclude your meal on a sweet note with our tempting desserts,
              including a comforting apple-infused creation and rich chocolate
              delights that encapsulate the essence of American indulgence.
            </p>
            <ButtonLink className="small__button">See More</ButtonLink>
          </div>
        </div>
      </div>
      <div className={classes.offerings__container__cta}>
        <ButtonLink className="big__button">All Offerings</ButtonLink>
      </div>
    </section>
  );
}

export default OfferingsSection;

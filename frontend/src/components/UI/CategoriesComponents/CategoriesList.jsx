import classes from "./CategoriesList.module.css";

import ButtonLink from "../Others/ButtonLink";

function CategoriesList() {
  return (
    <section className="first__section">
      <h2>All Offerings</h2>
      <div className={classes.categories__list__container}>
        <div className={classes.categories__item}>
          <div className={classes.categories__item__container__img}>
            <img
              src="/img/categories-main.jpg"
              className={classes.categories__item__img}
            />
          </div>
          <div className={classes.categories__item__container__info}>
            <h3 className={classes.categories__item__title}>Main Dishes</h3>
            <p>
              Indulge in a culinary journey at Bald Eagle Bistro with our
              exquisite main dishes that showcase a symphony of flavors and
              artful presentations. Each carefully crafted dish is a testament
              to our commitment to culinary excellence. From succulent grilled
              proteins to carefully composed vegetarian delights, our main
              courses feature the finest, locally sourced ingredients. Dive into
              a world where bold spices, vibrant colors, and innovative cooking
              techniques come together to create a dining experience that
              transcends the ordinary. Whether you crave the robust flavors of a
              perfectly seared steak or the delicate balance of a thoughtfully
              curated vegetarian plate, our main dishes are a celebration of
              culinary craftsmanship, inviting you to savor each bite in a warm
              and inviting atmosphere at Bald Eagle Bistro.
            </p>
            <ButtonLink className="big__button">See all</ButtonLink>
          </div>
        </div>
        <div className={classes.categories__item}>
          <div className={classes.categories__item__container__img}>
            <img
              src="/img/categories-sides.jpg"
              className={classes.categories__item__img}
            />
          </div>
          <div className={classes.categories__item__container__info}>
            <h3 className={classes.categories__item__title}>Side Dishes</h3>
            <p>
              Elevate your meal with the exceptional side dishes at Bald Eagle
              Bistro, designed to complement and enhance the flavors of our main
              courses. Each side dish is a carefully curated fusion of seasonal
              produce and inventive culinary techniques, adding layers of taste
              and texture to your dining experience. Whether you're drawn to the
              crisp freshness of garden salads or the comforting warmth of
              perfectly seasoned grains, our side dishes transform every bite
              into a harmonious blend of flavors, turning your meal into a
              memorable culinary journey.
            </p>
            <ButtonLink className="big__button">See all</ButtonLink>
          </div>
        </div>
        <div className={classes.categories__item}>
          <div className={classes.categories__item__container__img}>
            <img
              src="/img/categories-dessert.jpg"
              className={classes.categories__item__img}
            />
          </div>
          <div className={classes.categories__item__container__info}>
            <h3 className={classes.categories__item__title}>Desserts</h3>
            <p>
              Satisfy your sweet cravings with the delectable desserts at Bald
              Eagle Bistro. Our dessert menu is a symphony of indulgence,
              featuring an array of tempting treats crafted to perfection. From
              velvety chocolate creations to light and airy confections, each
              dessert is a delightful finale to your culinary experience.
              Immerse yourself in the rich, sweet symphony of flavors, where
              every bite is a celebration of the artistry and passion that
              defines our dessert offerings.
            </p>
            <ButtonLink className="big__button">See all</ButtonLink>
          </div>
        </div>
        <div className={classes.categories__item}>
          <div className={classes.categories__item__container__img}>
            <img
              src="/img/categories-appetizers.jpg"
              className={classes.categories__item__img}
            />
          </div>
          <div className={classes.categories__item__container__info}>
            <h3 className={classes.categories__item__title}>Appetizers</h3>
            <p>
              Begin your culinary adventure at Bald Eagle Bistro with our
              tantalizing appetizers that set the stage for a memorable dining
              experience. Our appetizer menu features a medley of flavors and
              textures, from crispy bites to savory dips, all meticulously
              crafted to ignite your taste buds. Shareable and irresistible,
              each appetizer is a prelude to the culinary journey that awaits.
              Whether you opt for the bold flavors of our house specialties or
              the comforting familiarity of classic starters, our appetizer
              selection promises to awaken your palate and set the tone for an
              exceptional dining experience.
            </p>
            <ButtonLink className="big__button">See all</ButtonLink>
          </div>
        </div>
        <div className={classes.categories__item}>
          <div className={classes.categories__item__container__img}>
            <img
              src="/img/categories-drinks.jpg"
              className={classes.categories__item__img}
            />
          </div>
          <div className={classes.categories__item__container__info}>
            <h3 className={classes.categories__item__title}>Drinks</h3>
            <p>
              Quench your thirst with the captivating array of beverages at Bald
              Eagle Bistro. From handcrafted cocktails to refreshing mocktails,
              our drink menu is a celebration of flavor and innovation. Sip on
              expertly crafted concoctions made from premium spirits and fresh,
              high-quality ingredients. Whether you're in the mood for a classic
              cocktail or a unique, signature creation, our drink menu is
              designed to complement the diverse flavors of our cuisine,
              promising a refreshing and enjoyable experience with every sip.
            </p>
            <ButtonLink className="big__button">See all</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoriesList;

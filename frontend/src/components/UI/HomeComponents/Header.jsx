import classes from "./Header.module.css";

import ButtonLink from "../Others/ButtonLink";

function Header() {
  return (
    <header>
      <div>
        <h1 className={classes.header__title}>
          Welcome to the Bald Eagle Bistro
        </h1>
        <p>
          Welcome to Bald Eagle Bistro, where culinary excellence takes flight.
          Nestled in the heart of New Orleans, our restaurant is a haven for
          those seeking an unforgettable dining experience. Immerse yourself in
          the artistry of our chefs as they craft each dish with precision and
          passion.
        </p>
        <div className={classes.header__container__btns}>
          <ButtonLink path="/products" className="big__button">
            Shop Now
          </ButtonLink>
          <ButtonLink path="/auth/signup" className="text__button">
            Register
          </ButtonLink>
        </div>
      </div>
      <div
        className={`${classes.header__container} ${classes.header__container__images}`}
      >
        <img
          src="/img/header-2.jpg"
          className={`${classes.header__img} ${classes.header__img__1}`}
        />
        <img
          src="/img/header.jpg"
          className={`${classes.header__img} ${classes.header__img__2}`}
        />
      </div>
    </header>
  );
}

export default Header;

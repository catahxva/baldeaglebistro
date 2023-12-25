import classes from "./Navigation.module.css";

import { Link } from "react-router-dom";

function Navigation({ openMobileNav }) {
  const cartAmount = 0;

  return (
    <nav className={classes.nav}>
      <div className={classes.nav__interior}>
        <Link className={`${classes.nav__link} ${classes.nav__logo}`}>
          Bold Eagle
        </Link>
        <div className={classes.nav__group}>
          <Link className={classes.nav__link}>Products</Link>
          <Link className={classes.nav__link}>Offerings</Link>
        </div>
        <div className={classes.nav__group}>
          <Link className={classes.nav__link}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${classes.nav__svg}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </Link>
          <Link className={`${classes.nav__link} ${classes.nav__link__cart}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${classes.nav__svg}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <div className={classes.nav__cart__amount}>
              <span className={classes.nav__cart__amount__span}>
                {cartAmount}
              </span>
            </div>
          </Link>
          <Link className={classes.nav__link}>Signup</Link>
          <Link className={classes.nav__link}>Login</Link>
          <button className={`basic__btn__styling ${classes.nav__mobile__btn}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${classes.nav__svg}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
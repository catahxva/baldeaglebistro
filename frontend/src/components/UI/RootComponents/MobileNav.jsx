import classes from "./MobileNav.module.css";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import MobileNavListElement from "./MobileNavListElement";
import Overlay from "../Others/Overlay";

function MobileNav({ mobileNavActive, closeMobileNav }) {
  const userToken = useSelector((state) => state.auth.token);

  return (
    <>
      {mobileNavActive && <Overlay close={closeMobileNav} />}
      <div
        className={`${classes.mobile__nav} ${
          mobileNavActive ? classes.mobile__nav__active : ""
        }`}
      >
        <div className={classes.mobile__nav__interior}>
          <button
            onClick={() => closeMobileNav(false)}
            className={classes.mobile__nav__btn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${classes.mobile__nav__svg}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
          <ul className={classes.mobile__nav__link__list}>
            <MobileNavListElement closeMobileNav={closeMobileNav}>
              <Link to="/products" className={classes.mobile__nav__link}>
                Products
              </Link>
            </MobileNavListElement>
            <MobileNavListElement closeMobileNav={closeMobileNav}>
              <Link to="/categories" className={classes.mobile__nav__link}>
                Offerings
              </Link>
            </MobileNavListElement>
            <MobileNavListElement closeMobileNav={closeMobileNav}>
              <Link to="/cart" className={classes.mobile__nav__link}>
                Shopping Cart
              </Link>
            </MobileNavListElement>
            <MobileNavListElement closeMobileNav={closeMobileNav}>
              <Link to="/search" className={classes.mobile__nav__link}>
                Search
              </Link>
            </MobileNavListElement>
            {userToken && (
              <MobileNavListElement closeMobileNav={closeMobileNav}>
                <Link to="/account" className={classes.mobile__nav__link}>
                  Account
                </Link>
              </MobileNavListElement>
            )}
            {!userToken && (
              <>
                <MobileNavListElement closeMobileNav={closeMobileNav}>
                  <Link to="/auth/signup" className={classes.mobile__nav__link}>
                    Signup
                  </Link>
                </MobileNavListElement>
                <MobileNavListElement closeMobileNav={closeMobileNav}>
                  <Link to="/auth/login" className={classes.mobile__nav__link}>
                    Login
                  </Link>
                </MobileNavListElement>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MobileNav;

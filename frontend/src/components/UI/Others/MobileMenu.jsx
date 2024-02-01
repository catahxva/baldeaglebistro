import classes from "./MobileMenu.module.css";

import Overlay from "./Overlay";

function MobileMenu({ children, openMobileMenu, closeMobileMenu }) {
  return (
    <>
      {openMobileMenu && <Overlay close={closeMobileMenu} />}
      <div
        className={`${classes.mobile__menu} ${
          openMobileMenu && classes.mobile__menu__active
        }`}
      >
        <div className={classes.mobile__menu__interior}>
          <button
            onClick={() => closeMobileMenu(false)}
            className={classes.mobile__menu__btn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${classes.mobile__menu__svg}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </>
  );
}

export default MobileMenu;

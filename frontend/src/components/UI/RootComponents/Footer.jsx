import classes from "./Footer.module.css";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__interior}>
        <Link to="/" className={classes.footer__logo}>
          Bold Eagle
        </Link>
        <div className={classes.footer__container}>
          <Link to="/categories" className={classes.footer__link}>
            Offerings
          </Link>
          <Link className={classes.footer__link}>Products</Link>
          <Link className={classes.footer__link}>Register</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import generalClasses from "./GeneralAuthClasses.module.css";

import { Link } from "react-router-dom";

function AuthSucccessMessage({ message }) {
  return (
    <div className={generalClasses.auth__container__message}>
      <span className={generalClasses.auth__message}>{message}</span>
      <Link to="/" className={generalClasses.auth__link}>
        Home page
      </Link>
    </div>
  );
}

export default AuthSucccessMessage;

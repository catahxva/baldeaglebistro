import classes from "./ErrorContent.module.css";

import ButtonLink from "../Others/ButtonLink";

function ErrorContent() {
  return (
    <div className={classes.error}>
      <div className={classes.error__interior}>
        <span className={classes.error__message}>
          Sorry! An unexpected error has occurred.
        </span>
        <div className={classes.error__container__btn}>
          <ButtonLink className="big__button" path="/">
            Home Page
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

export default ErrorContent;

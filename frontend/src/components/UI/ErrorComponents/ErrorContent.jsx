import classes from "./ErrorContent.module.css";

function ErrorContent() {
  return (
    <div className={classes.error}>
      <span className={classes.error__message}>
        Sorry! An unexpected error has occurred.
      </span>
    </div>
  );
}

export default ErrorContent;

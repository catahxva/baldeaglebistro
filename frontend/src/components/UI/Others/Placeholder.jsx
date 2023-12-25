import classes from "./Placeholder.module.css";

function Placeholder({ message, type }) {
  return (
    <div className={classes.placeholder}>
      {type === "error" ? (
        <span className={classes.placeholder__error}>{message}</span>
      ) : (
        ""
      )}
    </div>
  );
}

export default Placeholder;

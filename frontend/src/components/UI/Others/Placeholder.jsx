import classes from "./Placeholder.module.css";

function Placeholder({ message, type, size }) {
  let additionalClass;

  if (size === "small") additionalClass = classes.placeholder__smaller__height;

  if (size === "big") additionalClass = classes.placeholder__bigger__height;

  if (size === "page") additionalClass = classes.placeholder__page__height;

  return (
    <div className={`${classes.placeholder} ${additionalClass}`}>
      {type === "error" ? (
        <span className={classes.placeholder__error}>{message}</span>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 ${classes.placeholder__svg}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      )}
    </div>
  );
}

export default Placeholder;

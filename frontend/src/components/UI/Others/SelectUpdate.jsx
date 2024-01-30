import classes from "./SelectUpdate.module.css";

function SelectUpdate({
  edit,
  setEdit,
  spanText,
  selectHandler,
  submitting,
  type,
}) {
  const typeCondition = type === "availability";

  return (
    <div className={classes.select__update__container}>
      {!edit && (
        <span className={classes.select__update__span}>{spanText}</span>
      )}
      {edit && (
        <select
          onChange={selectHandler}
          className={classes.select__update__selecter}
        >
          <option>Select</option>
          <option value={typeCondition ? "available" : "pending"}>
            {typeCondition ? "Available" : "Pending"}
          </option>
          <option value={typeCondition ? "unavailable" : "delivered"}>
            {typeCondition ? "Unavailable" : "Delivered"}
          </option>
        </select>
      )}
      <button
        onClick={() => setEdit((prevState) => !prevState)}
        className={classes.select__update__edit__btn}
      >
        {!submitting && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-6 h-6 ${classes.select__update__edit__btn__svg}`}
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
          </svg>
        )}
        {submitting && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 ${classes.select__update__edit__btn__svg} ${classes.select__update__edit__btn__svg__animated}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

export default SelectUpdate;

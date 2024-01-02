import classes from "./SearchForm.module.css";

import { useRef } from "react";

function SearchForm({ changeQuery }) {
  const inputRef = useRef();

  const submitHandler = function (e) {
    e.preventDefault();

    changeQuery(inputRef.current.value);
  };

  const changeHandler = function (e) {
    changeQuery(e.target.value);
  };

  return (
    <form className={classes.search__form} onSubmit={submitHandler}>
      <input
        type="text"
        name="query"
        placeholder="Search for any product"
        className={classes.search__form__input}
        onChange={changeHandler}
        ref={inputRef}
      />
      <button className={classes.search__form__button}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 ${classes.search__form__svg}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </form>
  );
}

export default SearchForm;

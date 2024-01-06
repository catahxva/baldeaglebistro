import classes from "./FormGroup.module.css";

import { useState } from "react";

function FormGroup({
  nameProp,
  type = "text",
  labelText,
  placeholderText,
  value,
  onChange,
  onBlur,
  error,
}) {
  return (
    <div className={classes.form__group}>
      <label htmlFor={nameProp} className={classes.form__label}>
        {labelText}
      </label>
      <div className={classes.form__container__input}>
        <input
          name={nameProp}
          type={type}
          placeholder={placeholderText}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`${classes.form__input} ${
            value.length > 0 ? classes.form__input__active : ""
          }`}
          required
        />
        {type === "password" && <button></button>}
      </div>
      {error && <span className={classes.form__span__error}>{error}</span>}
    </div>
  );
}

export default FormGroup;

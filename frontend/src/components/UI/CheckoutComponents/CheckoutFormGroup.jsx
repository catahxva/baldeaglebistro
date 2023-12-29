import classes from "./CheckoutFormGroup.module.css";

function CheckoutFormGroup({
  nameProp,
  labelText,
  placeholderText,
  value,
  onChange,
  onBlur,
  error,
}) {
  return (
    <div className={classes.checkout__form__group}>
      <label htmlFor={nameProp} className={classes.checkout__form__label}>
        {labelText}
      </label>
      <input
        name={nameProp}
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${classes.checkout__form__input} ${
          value.length > 0 ? classes.checkout__form__input__active : ""
        }`}
        required
      />
      {error && (
        <span className={classes.checkout__form__span__error}>{error}</span>
      )}
    </div>
  );
}

export default CheckoutFormGroup;

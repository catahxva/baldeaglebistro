import classes from "./FormGroup.module.css";

function FormGroup({
  nameProp,
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
      <input
        name={nameProp}
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${classes.form__input} ${
          value.length > 0 ? classes.form__input__active : ""
        }`}
        required
      />
      {error && <span className={classes.form__span__error}>{error}</span>}
    </div>
  );
}

export default FormGroup;

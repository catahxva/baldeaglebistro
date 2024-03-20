import generalClasses from "./GeneralAuthClasses.module.css";

import { Link } from "react-router-dom";

import FormGroup from "../Others/FormGroup";

function AuthForm({
  submitHandler,
  inputObjects,
  falseValues,
  trueErrors,
  generalError,
  submitting,
  page,
}) {
  const initialButtonTextValue =
    page === "signup"
      ? "Signup"
      : page === "login"
      ? "Login"
      : page === "forgot"
      ? "Submit"
      : "Reset";

  let buttonText = initialButtonTextValue;

  if (submitting) buttonText = "Submitting...";

  if (!submitting && !generalError) buttonText = "Success";

  if (!submitting && generalError) buttonText = initialButtonTextValue;

  return (
    <form onSubmit={submitHandler}>
      {inputObjects.map((inputObj) => {
        return <FormGroup key={inputObj.nameProp} {...inputObj} />;
      })}
      {generalError && (
        <span className={generalClasses.auth__span__error}>{generalError}</span>
      )}
      <div className={generalClasses.auth__form__container__buttons}>
        <button
          disabled={falseValues || trueErrors || submitting}
          className={generalClasses.auth__form__button}
        >
          {buttonText}
        </button>
        {page === "signup" && (
          <Link to="/auth/login" className={generalClasses.auth__form__link}>
            Login
          </Link>
        )}
        {page === "login" && (
          <Link to="/auth/forgot" className={generalClasses.auth__form__link}>
            Forgot Password
          </Link>
        )}
      </div>
    </form>
  );
}

export default AuthForm;

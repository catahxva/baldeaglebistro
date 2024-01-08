import generalClasses from "./GeneralAuthClasses.module.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { useInput } from "../../../hooks/useInput";

import FormGroup from "../Others/FormGroup";

function ResetForgotPassContent() {
  const [generalError, setGeneralError] = useState();

  const [submitting, setSubmitting] = useState();
  const [buttonText, setButtonText] = useState("Reset");

  const {
    value: newPasswordValue,
    inputChangeHandler: newPasswordChangeHandler,
    inputBlurHandler: newPasswordBlurHandler,
    error: newPasswordError,
  } = useInput("", (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters long";
  });

  const {
    value: newPasswordConfirmValue,
    inputChangeHandler: newPasswordConfirmChangeHandler,
    inputBlurHandler: newPasswordConfirmBlurHandler,
    error: newPasswordConfirmError,
  } = useInput("", (value) => {
    if (!value) return "Confirming passwords is required";
    if (value !== newPasswordValue) return "Passwords must match";
  });

  return (
    <div className={generalClasses.auth__box}>
      <div className={generalClasses.auth__container}>
        <h2 className="title__no__margin">Reset password</h2>
        <Link to="/" className={generalClasses.auth__link}>
          Home Page
        </Link>
      </div>
      <form>
        <FormGroup
          nameProp="newPassword"
          labelText="New Password"
          placeholderText="Your new password"
          value={newPasswordValue}
          onChange={newPasswordChangeHandler}
          onBlur={newPasswordBlurHandler}
          error={newPasswordError}
        />
        <FormGroup
          nameProp="newConfirmPassword"
          labelText="Confirm New Password"
          placeholderText="Confirm your password"
          value={newPasswordConfirmValue}
          onChange={newPasswordConfirmChangeHandler}
          onBlur={newPasswordConfirmBlurHandler}
          error={newPasswordConfirmError}
        />
        {generalError && (
          <span className={generalClasses.auth__span__error}>
            {generalError}
          </span>
        )}
        <div className={generalClasses.auth__form__container__buttons}>
          <button
            disabled={
              !newPasswordValue ||
              !newPasswordConfirmValue ||
              newPasswordError ||
              newPasswordConfirmError ||
              submitting
            }
            className={generalClasses.auth__form__button}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetForgotPassContent;

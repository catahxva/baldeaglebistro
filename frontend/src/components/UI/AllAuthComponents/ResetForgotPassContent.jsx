import generalClasses from "./GeneralAuthClasses.module.css";

import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { resetForgotPassword } from "../../../util/requests";

import { useInput } from "../../../hooks/useInput";

import FormGroup from "../Others/FormGroup";

function ResetForgotPassContent() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [successfulReset, setSuccessfulReset] = useState();
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

  const { mutate } = useMutation({
    mutationFn: resetForgotPassword,
    onMutate: () => {
      setSubmitting(true);
      setButtonText("Submitting...");
    },
    onSuccess: () => {
      setSubmitting(false);
      setButtonText("Submit");

      setSuccessfulReset(true);

      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
    },
    onError: (error) => {
      setSubmitting(false);
      setButtonText("Submit");

      setGeneralError(error.message);
    },
  });

  const submitHandler = function (e) {
    e.preventDefault();

    if (
      !token ||
      !newPasswordValue ||
      !newPasswordConfirmValue ||
      newPasswordError ||
      newPasswordConfirmError
    )
      return;

    mutate({
      token,
      newPassword: newPasswordValue,
      newPasswordConfirm: newPasswordConfirmValue,
    });
  };

  return (
    <div className={generalClasses.auth__box}>
      {!successfulReset && (
        <>
          <div className={generalClasses.auth__container}>
            <h2 className="title__no__margin">Reset password</h2>
            <Link to="/" className={generalClasses.auth__link}>
              Home Page
            </Link>
          </div>
          <form onSubmit={submitHandler}>
            <FormGroup
              nameProp="newPassword"
              labelText="New Password"
              type="password"
              placeholderText="Your new password"
              value={newPasswordValue}
              onChange={newPasswordChangeHandler}
              onBlur={newPasswordBlurHandler}
              error={newPasswordError}
            />
            <FormGroup
              nameProp="newConfirmPassword"
              labelText="Confirm New Password"
              type="password"
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
        </>
      )}
      {successfulReset && (
        <div className={generalClasses.auth__container__message}>
          <span className={generalClasses.auth__message}>
            Resetting your password was successful. You will be redirected to
            the login page soon.
          </span>
          <Link to="/" className={generalClasses.auth__link}>
            Home Page
          </Link>
        </div>
      )}
    </div>
  );
}

export default ResetForgotPassContent;

import generalClasses from "./GeneralAuthClasses.module.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../../util/requests";

import { useInput } from "../../../hooks/useInput";

import FormGroup from "../Others/FormGroup";

function ForgotPasswordContent() {
  const [generalError, setGeneralError] = useState();

  const [submitting, setSubmitting] = useState();
  const [buttonText, setButtonText] = useState("Submit");

  const [successfulSubmit, setSuccessfulSubmit] = useState(false);

  const {
    value: emailValue,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    error: emailError,
  } = useInput("", (value) => {
    if (!value) return "Email is required";
    if (!value.includes("@")) return "Please provide a valid email address";
  });

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onMutate: () => {
      setSubmitting(true);
      setButtonText("Submitting...");
      setGeneralError("");
    },
    onSuccess: () => {
      setSubmitting(false);
      setButtonText("Success");

      setSuccessfulSubmit(true);
    },
    onError: (error) => {
      setSubmitting(false);
      setButtonText("Submit");

      setGeneralError(error.message);
    },
  });

  const submitHandler = function (e) {
    e.preventDefault();

    if (!emailValue || emailError) return;

    mutate({
      email: emailValue,
    });
  };

  return (
    <div className={generalClasses.auth__box}>
      {!successfulSubmit && (
        <>
          <div className={generalClasses.auth__container}>
            <h2 className="title__no__margin">Forgot password</h2>
            <Link to="/" className={generalClasses.auth__link}>
              Home page
            </Link>
          </div>
          <p>
            If you've forgotten your password, please enter the email you used
            to create your account down below, and we are going to send you an
            email to reset your password.
          </p>
          <form onSubmit={submitHandler}>
            <FormGroup
              nameProp="email"
              labelText="Email"
              type="email"
              placeholderText="Your account email"
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              error={emailError}
            />
            {generalError && (
              <span className={generalClasses.auth__span__error}>
                {generalError}
              </span>
            )}
            <div className={generalClasses.auth__form__container__buttons}>
              <button
                disabled={!emailValue || emailError || submitting}
                className={generalClasses.auth__form__button}
              >
                {buttonText}
              </button>
            </div>
          </form>
        </>
      )}
      {successfulSubmit && (
        <div className={generalClasses.auth__container__message}>
          <span className={generalClasses.auth__message}>
            Request was successfully submitted! You will soon receive an email
            which you can use to reset your password.
          </span>
          <Link to="/" className={generalClasses.auth__link}>
            Home Page
          </Link>
        </div>
      )}
    </div>
  );
}

export default ForgotPasswordContent;

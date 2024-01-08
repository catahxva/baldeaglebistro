import generalClasses from "./GeneralAuthClasses.module.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../../util/requests";

import { useInput } from "../../../hooks/useInput";

import FormGroup from "../Others/FormGroup";

function SignupContent() {
  const [backendErrors, setBackendErrors] = useState({});
  const [dbErrors, setDbErrors] = useState({});
  const [generalError, setGeneralError] = useState();

  const [submitting, setSubmitting] = useState();
  const [buttonText, setButtonText] = useState("Signup");

  const [successfulSignup, setSuccessfulSignup] = useState(false);

  const {
    value: usernameValue,
    inputChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    error: usernameError,
  } = useInput(
    "",
    (value) => {
      if (!value) return "User name is required";
      if (value.length < 6)
        return "User name must be at least 6 characters long";
    },
    backendErrors?.username || dbErrors?.username
  );
  const {
    value: emailValue,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    error: emailError,
  } = useInput(
    "",
    (value) => {
      if (!value) return "Email is required";
      if (!value.includes("@")) return "Please provide a valid email address";
    },
    backendErrors?.email || dbErrors?.email
  );
  const {
    value: passwordValue,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    error: passwordError,
  } = useInput(
    "",
    (value) => {
      if (!value) return "Password is required";
      if (value.length < 8)
        return "Password must be at least 8 characters long";
    },
    backendErrors?.password
  );
  const {
    value: passwordConfirmValue,
    inputChangeHandler: passwordConfirmChangeHandler,
    inputBlurHandler: passwordConfirmBlurHandler,
    error: passwordConfirmError,
  } = useInput(
    "",
    (value) => {
      if (!value) return "Confirming password is required";
      if (value !== passwordValue) return "Passwords must match";
    },
    backendErrors?.passwordConfirm
  );

  const { mutate } = useMutation({
    mutationFn: signup,
    onMutate: () => {
      setSubmitting(true);
      setButtonText("Submitting...");
      setGeneralError("");
    },
    onSuccess: () => {
      setButtonText("Success");
      setSubmitting(false);

      setSuccessfulSignup(true);
    },
    onError: (error) => {
      if (error.message) setGeneralError(error.message);

      if (error.errorName === "Validation error")
        setBackendErrors(error.errorObject);

      if (error.errorName === "MongoServerError")
        setDbErrors(error.errorObject);

      setButtonText("Signup");
      setSubmitting(false);
    },
    onSettled: () => {
      setSubmitting(false);
    },
  });

  const submitHandler = function (e) {
    e.preventDefault();

    if (
      !usernameValue ||
      !emailValue ||
      !passwordValue ||
      !passwordConfirmValue ||
      usernameError ||
      emailError ||
      passwordError ||
      passwordConfirmError
    )
      return;

    mutate({
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
      passwordConfirm: passwordConfirmValue,
    });
  };

  return (
    <div className={generalClasses.auth__box}>
      {!successfulSignup && (
        <>
          <div className={generalClasses.auth__container}>
            <h2 className="title__no__margin">Signup</h2>
            <Link to="/" className={generalClasses.auth__link}>
              Home page
            </Link>
          </div>
          <p>
            Create an account now and get all the benefits it offers: order
            history, a faster checkout and the order re-do feature.
          </p>
          <form onSubmit={submitHandler}>
            <FormGroup
              nameProp="username"
              labelText="User Name"
              placeholderText="Your user name"
              value={usernameValue}
              onChange={usernameChangeHandler}
              onBlur={usernameBlurHandler}
              onFocus={() => {
                setDbErrors((prevState) => {
                  delete prevState.username;

                  return {
                    ...prevState,
                  };
                });
                setBackendErrors((prevState) => {
                  delete prevState.username;

                  return {
                    ...prevState,
                  };
                });
              }}
              error={usernameError}
            />
            <FormGroup
              nameProp="email"
              type="email"
              labelText="Email"
              placeholderText="Your email"
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              onFocus={() => {
                setDbErrors((prevState) => {
                  delete prevState.email;

                  return {
                    ...prevState,
                  };
                });
                setBackendErrors((prevState) => {
                  delete prevState.email;

                  return {
                    ...prevState,
                  };
                });
              }}
              error={emailError}
            />
            <FormGroup
              nameProp="password"
              type="password"
              labelText="Password"
              placeholderText="Your password"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              onFocus={() => {
                setBackendErrors((prevState) => {
                  delete prevState.password;

                  return {
                    ...prevState,
                  };
                });
              }}
              error={passwordError}
            />
            <FormGroup
              nameProp="passwordConfirm"
              type="password"
              labelText="Confirm password"
              placeholderText="Confirm your password"
              value={passwordConfirmValue}
              onChange={passwordConfirmChangeHandler}
              onBlur={passwordConfirmBlurHandler}
              onFocus={() => {
                setBackendErrors((prevState) => {
                  delete prevState.passwordConfirm;

                  return {
                    ...prevState,
                  };
                });
              }}
              error={passwordConfirmError}
            />
            {generalError && (
              <span className={generalClasses.auth__span__error}>
                {generalError}
              </span>
            )}
            <div className={generalClasses.auth__form__container__buttons}>
              <button
                disabled={
                  !usernameValue ||
                  !emailValue ||
                  !passwordValue ||
                  !passwordConfirmValue ||
                  usernameError ||
                  emailError ||
                  passwordError ||
                  passwordConfirmError ||
                  submitting
                }
                className={generalClasses.auth__form__button}
              >
                {buttonText}
              </button>
              <Link
                to="/auth/login"
                className={generalClasses.auth__form__link}
              >
                Login
              </Link>
            </div>
          </form>
        </>
      )}
      {successfulSignup && (
        <div className={generalClasses.auth__container__message}>
          <span className={generalClasses.auth__message}>
            Signup successful! You will soon receive an email to verify your
            account.
          </span>
          <Link to="/" className={generalClasses.auth__link}>
            Home page
          </Link>
        </div>
      )}
    </div>
  );
}

export default SignupContent;

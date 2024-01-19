import generalClasses from "./GeneralAuthClasses.module.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../util/requests";

import { useInput } from "../../../hooks/useInput";

import FormGroup from "../Others/FormGroup";

function LoginContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [generalError, setGeneralError] = useState();

  const [submitting, setSubmitting] = useState();
  const [buttonText, setButtonText] = useState("Login");

  const {
    value: emailValue,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    error: emailError,
  } = useInput("", (value) => {
    if (!value) return "Email is required";
    if (!value.includes("@")) return "Please provide a valid email";
  });

  const {
    value: passwordValue,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    error: passwordError,
  } = useInput("", (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters long";
  });

  const { mutate } = useMutation({
    mutationFn: login,
    onMutate: () => {
      setSubmitting(true);
      setButtonText("Submitting...");
      setGeneralError("");
    },
    onSuccess: (data) => {
      setSubmitting(false);
      setButtonText("Success");

      dispatch(
        authActions.authenticate({
          token: data.token,
          role: data.user.role,
          email: data.user.email,
          username: data.user.username,
          address: data.user.address,
        })
      );

      navigate("/");
    },
    onError: (error) => {
      setSubmitting(false);
      setButtonText("Login");

      setGeneralError(error.message);
    },
  });

  const submitHandler = function (e) {
    e.preventDefault();

    if (!emailValue || !passwordValue || emailError || passwordError) return;

    mutate({
      email: emailValue,
      password: passwordValue,
    });
  };

  return (
    <div className={generalClasses.auth__box}>
      <div className={generalClasses.auth__container}>
        <h2 className="title__no__margin">LOGIN</h2>
        <Link to="/" className={generalClasses.auth__link}>
          Home Page
        </Link>
      </div>
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
        <FormGroup
          nameProp="password"
          labelText="Password"
          type="password"
          placeholderText="Your account password"
          value={passwordValue}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          error={passwordError}
        />
        {generalError && (
          <span className={generalClasses.auth__span__error}>
            {generalError}
          </span>
        )}
        <div className={generalClasses.auth__form__container__buttons}>
          <button
            disabled={
              !emailValue ||
              !passwordValue ||
              emailError ||
              passwordError ||
              submitting
            }
            className={generalClasses.auth__form__button}
          >
            {buttonText}
          </button>
          <Link to="/auth/forgot" className={generalClasses.auth__form__link}>
            Forgot password
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginContent;

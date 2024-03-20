import generalClasses from "./GeneralAuthClasses.module.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../../util/requests";

import { useInput } from "../../../hooks/useInput";

import { generateFalseValuesTrueErrors } from "../../../util/otherFunctions";

import AuthForm from "./AuthForm";
import AuthSucccessMessage from "./AuthSuccessMessage";

function SignupContent() {
  const [validationErrors, setValidationErrors] = useState({});
  const [dbErrors, setDbErrors] = useState({});
  const [generalError, setGeneralError] = useState();

  const [submitting, setSubmitting] = useState();

  const [successfulSignup, setSuccessfulSignup] = useState(false);

  const userInput = useInput(
    "",
    (value) => {
      if (!value) return "User name is required";
      if (value.length < 6)
        return "User name must be at least 6 characters long";
    },
    validationErrors?.username || dbErrors?.username
  );
  const emailInput = useInput(
    "",
    (value) => {
      if (!value) return "Email is required";
      if (!value.includes("@")) return "Please provide a valid email address";
    },
    validationErrors?.email || dbErrors?.email
  );
  const passwordInput = useInput(
    "",
    (value) => {
      if (!value) return "Password is required";
      if (value.length < 8)
        return "Password must be at least 8 characters long";
    },
    validationErrors?.password
  );
  const passwordConfirmInput = useInput(
    "",
    (value) => {
      if (!value) return "Confirming password is required";
      if (value !== passwordInput.value) return "Passwords must match";
    },
    validationErrors?.passwordConfirm
  );

  const generateOnFocusFn = function (validation, db, field) {
    if (validation && db) {
      return function () {
        setDbErrors((prevState) => {
          delete prevState[field];

          return {
            ...prevState,
          };
        });
        setValidationErrors((prevState) => {
          delete prevState[field];

          return {
            ...prevState,
          };
        });
      };
    }

    if (validation && !db) {
      return function () {
        setValidationErrors((prevState) => {
          delete prevState[field];

          return {
            ...prevState,
          };
        });
      };
    }
  };

  const inputObjects = [
    {
      nameProp: "username",
      labelText: "User Name",
      placeholderText: "Your user name",
      ...userInput,
      onFocus: generateOnFocusFn(true, true, "username"),
    },
    {
      nameProp: "email",
      type: "email",
      labelText: "Email",
      placeholderText: "Your email",
      ...emailInput,
      onFocus: generateOnFocusFn(true, true, "email"),
    },
    {
      nameProp: "password",
      type: "password",
      labelText: "Password",
      placeholderText: "Your password",
      ...passwordInput,
      onFocus: generateOnFocusFn(true, false, "password"),
    },
    {
      nameProp: "passwordConfirm",
      type: "password",
      labelText: "Confirm password",
      placeholderText: "Confirm your password",
      ...passwordConfirmInput,
      onFocus: generateOnFocusFn(true, false, "passwordConfirm"),
    },
  ];

  const { falseValues, trueErrors } =
    generateFalseValuesTrueErrors(inputObjects);

  const { mutate } = useMutation({
    mutationFn: signup,
    onMutate: () => {
      setSubmitting(true);
      setGeneralError("");
    },
    onSuccess: () => {
      setSubmitting(false);
      setSuccessfulSignup(true);
    },
    onError: (error) => {
      if (error.message) setGeneralError(error.message);

      if (error.errorName === "Validation error")
        setValidationErrors(error.errorObject);

      if (error.errorName === "MongoServerError")
        setDbErrors(error.errorObject);

      setSubmitting(false);
    },
    onSettled: () => {
      setSubmitting(false);
    },
  });

  const submitHandler = function (e) {
    e.preventDefault();

    if (falseValues || trueErrors) return;

    mutate({
      username: userInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      passwordConfirm: passwordConfirmInput.value,
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
          <AuthForm
            submitHandler={submitHandler}
            inputObjects={inputObjects}
            falseValues={falseValues}
            trueErrors={trueErrors}
            generalError={generalError}
            submitting={submitting}
            page={"signup"}
          />
        </>
      )}
      {successfulSignup && (
        <AuthSucccessMessage
          message={
            "Signup successful! You will soon receive an email to verify your account."
          }
        />
      )}
    </div>
  );
}

export default SignupContent;

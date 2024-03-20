import generalClasses from "./GeneralAuthClasses.module.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../../util/requests";

import { useInput } from "../../../hooks/useInput";

import AuthForm from "./AuthForm";
import AuthSucccessMessage from "./AuthSuccessMessage";

function ForgotPasswordContent() {
  const [generalError, setGeneralError] = useState();

  const [submitting, setSubmitting] = useState();

  const [successfulSubmit, setSuccessfulSubmit] = useState(false);

  const emailInput = useInput("", (value) => {
    if (!value) return "Email is required";
    if (!value.includes("@")) return "Please provide a valid email address";
  });

  const inputObjects = [
    {
      nameProp: "email",
      labelText: "Email",
      type: "email",
      placeholderText: "Your account email",
      ...emailInput,
    },
  ];

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onMutate: () => {
      setSubmitting(true);
      setGeneralError("");
    },
    onSuccess: () => {
      setSubmitting(false);

      setSuccessfulSubmit(true);
    },
    onError: (error) => {
      setSubmitting(false);

      setGeneralError(error.message);
    },
  });

  const submitHandler = function (e) {
    e.preventDefault();

    if (!emailInput.value || emailInput.error) return;

    mutate({
      email: emailInput.value,
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
          <AuthForm
            submitHandler={submitHandler}
            inputObjects={inputObjects}
            falseValues={!emailInput.value}
            trueErrors={emailInput.error}
            generalError={generalError}
            submitting={submitting}
          />
        </>
      )}
      {successfulSubmit && (
        <AuthSucccessMessage
          message={
            "Request was successfully submitted! You will soon receive an email which you can use to reset your password."
          }
        />
      )}
    </div>
  );
}

export default ForgotPasswordContent;

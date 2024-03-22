import generalClasses from "./GeneralAuthClasses.module.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../../util/requests";

import { useForgotPassInputs } from "../../../hooks/useForgotPassInputs";

import { generateFalseValuesTrueErrors } from "../../../util/otherFunctions";

import AuthForm from "./AuthForm";
import AuthSucccessMessage from "./AuthSuccessMessage";

function ForgotPasswordContent() {
  const [generalError, setGeneralError] = useState();

  const [submitting, setSubmitting] = useState();

  const [successfulSubmit, setSuccessfulSubmit] = useState(false);

  const { inputObjects, values } = useForgotPassInputs();

  const { falseValues, trueErrors } =
    generateFalseValuesTrueErrors(inputObjects);

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

    if (falseValues || trueErrors || submitting) return;

    mutate(values);
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
            falseValues={falseValues}
            trueErrors={trueErrors}
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

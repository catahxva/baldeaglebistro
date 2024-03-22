import generalClasses from "./GeneralAuthClasses.module.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../../util/requests";

import { useSignupInputs } from "../../../hooks/useSignupInputs";

import { generateFalseValuesTrueErrors } from "../../../util/otherFunctions";

import AuthForm from "./AuthForm";
import AuthSucccessMessage from "./AuthSuccessMessage";

function SignupContent() {
  const [validationErrors, setValidationErrors] = useState({});
  const [dbErrors, setDbErrors] = useState({});
  const [generalError, setGeneralError] = useState();

  const [submitting, setSubmitting] = useState();

  const [successfulSignup, setSuccessfulSignup] = useState(false);

  const { inputObjects, values } = useSignupInputs(
    dbErrors,
    validationErrors,
    setDbErrors,
    setValidationErrors
  );

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

    mutate(values);
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

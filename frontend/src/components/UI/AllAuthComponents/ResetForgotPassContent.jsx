import generalClasses from "./GeneralAuthClasses.module.css";

import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { resetForgotPassword } from "../../../util/requests";

import { useInput } from "../../../hooks/useInput";

import { generateFalseValuesTrueErrors } from "../../../util/otherFunctions";

import AuthForm from "./AuthForm";
import AuthSucccessMessage from "./AuthSuccessMessage";

function ResetForgotPassContent() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [successfulReset, setSuccessfulReset] = useState();
  const [generalError, setGeneralError] = useState();

  const [submitting, setSubmitting] = useState();

  const newPasswordInput = useInput("", (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters long";
  });

  const newPasswordConfirmInput = useInput("", (value) => {
    if (!value) return "Confirming passwords is required";
    if (value !== newPasswordInput.value) return "Passwords must match";
  });

  const inputObjects = [
    {
      nameProp: "newPassword",
      labelText: "New Password",
      type: "password",
      placeholderText: "Your new password",
      ...newPasswordInput,
    },
    {
      nameProp: "newConfirmPassword",
      labelText: "Confirm New Password",
      type: "password",
      placeholderText: "Confirm your password",
      ...newPasswordConfirmInput,
    },
  ];

  const { falseValues, trueErrors } =
    generateFalseValuesTrueErrors(inputObjects);

  const { mutate } = useMutation({
    mutationFn: resetForgotPassword,
    onMutate: () => {
      setSubmitting(true);
    },
    onSuccess: () => {
      setSubmitting(false);

      setSuccessfulReset(true);

      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
    },
    onError: (error) => {
      setSubmitting(false);

      setGeneralError(error.message);
    },
  });

  const submitHandler = function (e) {
    e.preventDefault();

    if (!token || falseValues || trueErrors) return;

    mutate({
      token,
      newPassword: newPasswordInput.value,
      newPasswordConfirm: newPasswordConfirmInput.value,
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
      {successfulReset && (
        <AuthSucccessMessage
          message={
            "Resetting your password was successful. You will be redirected to the login page soon."
          }
        />
      )}
    </div>
  );
}

export default ResetForgotPassContent;

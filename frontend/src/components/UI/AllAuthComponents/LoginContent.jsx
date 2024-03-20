import generalClasses from "./GeneralAuthClasses.module.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../util/requests";

import { useInput } from "../../../hooks/useInput";

import { generateFalseValuesTrueErrors } from "../../../util/otherFunctions";

import AuthForm from "./AuthForm";

function LoginContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [generalError, setGeneralError] = useState();

  const [submitting, setSubmitting] = useState();

  const emailInput = useInput("", (value) => {
    if (!value) return "Email is required";
    if (!value.includes("@")) return "Please provide a valid email";
  });

  const passwordInput = useInput("", (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters long";
  });

  const inputObjects = [
    {
      nameProp: "email",
      labelText: "Email",
      type: "email",
      placeholderText: "Your account email",
      ...emailInput,
    },
    {
      nameProp: "password",
      labelText: "Password",
      type: "password",
      placeholderText: "Your account password",
      ...passwordInput,
    },
  ];

  const { falseValues, trueErrors } =
    generateFalseValuesTrueErrors(inputObjects);

  const { mutate } = useMutation({
    mutationFn: login,
    onMutate: () => {
      setSubmitting(true);
      setGeneralError("");
    },
    onSuccess: (data) => {
      setSubmitting(false);

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

      setGeneralError(error.message);
    },
  });

  const submitHandler = function (e) {
    e.preventDefault();

    if (falseValues || trueErrors) return;

    mutate({
      email: emailInput.value,
      password: passwordInput.value,
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
      <AuthForm
        submitHandler={submitHandler}
        inputObjects={inputObjects}
        falseValues={falseValues}
        trueErrors={trueErrors}
        generalError={generalError}
        submitting={submitting}
        page={"login"}
      />
    </div>
  );
}

export default LoginContent;

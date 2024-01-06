import classes from "./SignupContent.module.css";

import { Link } from "react-router-dom";

import { useInput } from "../../../hooks/useInput";

import FormGroup from "../Others/FormGroup";

function SignupContent() {
  const {
    value: usernameValue,
    inputChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    error: usernameError,
  } = useInput("", (value) => {
    if (!value) return "User name is required";
    if (value.length < 6) return "User name must be at least 6 characters long";
  });
  const {
    value: emailValue,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    error: emailError,
  } = useInput("", (value) => {
    if (!value) return "Email is required";
    if (!value.includes("@")) return "Please provide a valid email address";
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
  const {
    value: passwordConfirmValue,
    inputChangeHandler: passwordConfirmChangeHandler,
    inputBlurHandler: passwordConfirmBlurHandler,
    error: passwordConfirmError,
  } = useInput("", (value) => {
    if (!value) return "Confirming password is required";
    if (value !== passwordValue) return "Passwords must match";
  });

  return (
    <div className={classes.signup}>
      <div className={classes.signup__container}>
        <h2 className="title__no__border">Signup</h2>
        <Link to="/" className={classes.signup__link}>
          Home page
        </Link>
      </div>
      <p>
        Create an account now and get all the benefits it offers: order history,
        a faster checkout and the order re-do feature.
      </p>
      <form className={classes.signup__form}>
        <FormGroup
          nameProp="username"
          labelText="User Name"
          placeholderText="Your user name"
          value={usernameValue}
          onChange={usernameChangeHandler}
          onBlur={usernameBlurHandler}
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
          error={passwordConfirmError}
        />
      </form>
    </div>
  );
}

export default SignupContent;

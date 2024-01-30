import classes from "./AccountResetPass.module.css";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../../../util/requests";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice";
import { uiActions } from "../../../store/uiSlice";
import { useInput } from "../../../hooks/useInput";

import FormGroup from "../Others/FormGroup";

function AccountResetPass() {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.auth.token);

  const [submitting, setSubmitting] = useState(false);
  const btnText = !submitting ? "Reset Password" : "Submitting...";

  const [error, setError] = useState(false);

  const { mutate } = useMutation({
    mutationFn: updatePassword,
    onMutate: () => {
      setSubmitting(true);
    },
    onError: (error) => {
      setError(error.message);
    },
    onSuccess: (data) => {
      dispatch(
        authActions.authenticate({
          token: data.token,
          role: data.user.role,
          email: data.user.email,
          username: data.user.username,
          address: data.user.address,
        })
      );

      dispatch(
        uiActions.showNotification({
          status: "success",
          message: "Password resetted successfully!",
        })
      );

      setTimeout(() => {
        dispatch(uiActions.hideNotification());
      }, 2000);
    },
    onSettled: () => {
      setSubmitting(false);
    },
  });

  const {
    value: currentPassValue,
    inputChangeHandler: currentPassChangeHandler,
    inputBlurHandler: currentPassBlurHandler,
    error: currentPassError,
  } = useInput(undefined, (value) => {
    if (!value) return "Current password is required";
  });

  const {
    value: newPassValue,
    inputChangeHandler: newPassChangeHandler,
    inputBlurHandler: newPassBlurHandler,
    error: newPassError,
  } = useInput(undefined, (value) => {
    if (!value) return "New password is required";

    if (value.length < 8)
      return "New password must be at least 8 characters long";
  });

  const {
    value: newPassConfirmValue,
    inputChangeHandler: newPassConfirmChangeHandler,
    inputBlurHandler: newPassConfirmBlurHandler,
    error: newPassConfirmError,
  } = useInput(undefined, (value) => {
    if (!value) return "Confirming your new password is required";

    if (value !== newPassValue) return "Passwords must match";
  });

  const submitHandler = function (e) {
    e.preventDefault();

    if (
      currentPassError ||
      newPassError ||
      newPassConfirmError ||
      !currentPassValue ||
      !newPassValue ||
      !newPassConfirmValue
    )
      return;

    mutate({
      token: userToken,
      currentPassword: currentPassValue,
      newPassword: newPassValue,
      newPasswordConfirm: newPassConfirmValue,
    });
  };

  return (
    <div className={classes.account__reset__container}>
      <h3 className="account__general__title">Reset Your Password</h3>
      <form onSubmit={submitHandler} className={classes.account__reset__form}>
        <FormGroup
          nameProp="currentPassword"
          labelText="Current Password"
          placeholderText="Your current password"
          type="password"
          value={currentPassValue}
          onChange={currentPassChangeHandler}
          onBlur={currentPassBlurHandler}
          error={currentPassError}
        />
        <FormGroup
          nameProp="newPassword"
          labelText="New Password"
          placeholderText="Your new password"
          type="password"
          value={newPassValue}
          onChange={newPassChangeHandler}
          onBlur={newPassBlurHandler}
          error={newPassError}
        />
        <FormGroup
          nameProp="newPasswordConfirm"
          labelText="Confirm Password"
          placeholderText="Confirm your password"
          type="password"
          value={newPassConfirmValue}
          onChange={newPassConfirmChangeHandler}
          onBlur={newPassConfirmBlurHandler}
          error={newPassConfirmError}
        />
        {error && (
          <span className={classes.account__reset__error}>{error}</span>
        )}
        <button
          disabled={
            !currentPassValue ||
            !newPassValue ||
            !newPassConfirmValue ||
            currentPassError ||
            newPassError ||
            newPassConfirmError ||
            submitting
          }
          className={classes.account__reset__form__btn}
        >
          {btnText}
        </button>
      </form>
    </div>
  );
}

export default AccountResetPass;

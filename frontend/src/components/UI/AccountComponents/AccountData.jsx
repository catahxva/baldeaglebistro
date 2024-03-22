import classes from "./AccountData.module.css";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice";
import { uiActions } from "../../../store/uiSlice";
import { useMutation } from "@tanstack/react-query";
import { updateAddress } from "../../../util/requests";

import { useAddressInputs } from "../../../hooks/useAddressInputs";

import { generateFalseValuesTrueErrors } from "../../../util/otherFunctions";

import FormGroup from "../Others/FormGroup";

function AccountData() {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  let buttonText = !showForm ? "Address Form" : "Hide Address Form";

  const [submitting, setSubmitting] = useState();
  const btnText = !submitting ? "Update Address" : "Submitting...";

  const [generalError, setGeneralError] = useState();

  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.email);
  const username = useSelector((state) => state.auth.username);
  const address = useSelector((state) => state.auth.address);

  const emailDefaultValue = address?.email ?? "";
  const nameDefaultValue = address?.name ?? "";
  const phoneDefaultValue = address?.phone ?? "";
  const streetNameDefaultValue = address?.street ?? "";
  const streetNumberDefaultValue = address?.streetNumber ?? "";

  const { inputObjects, values } = useAddressInputs(
    emailDefaultValue,
    nameDefaultValue,
    phoneDefaultValue,
    streetNameDefaultValue,
    streetNumberDefaultValue
  );

  const { falseValues, trueErrors } =
    generateFalseValuesTrueErrors(inputObjects);

  const { mutate } = useMutation({
    mutationFn: updateAddress,
    onMutate: () => {
      setSubmitting(true);
    },
    onError: (error) => {
      setGeneralError(error.message);
    },
    onSuccess: (data) => {
      setSubmitting(false);

      const addressDB = data.data.data;

      dispatch(
        authActions.updateUserAddress({
          address: {
            email: addressDB.email,
            name: addressDB.name,
            phone: addressDB.phone,
            street: addressDB.street,
            streetNumber: addressDB.streetNumber,
          },
        })
      );

      dispatch(
        uiActions.showNotification({
          status: "success",
          message: "Address updated successfully!",
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

  const submitHandler = function (e) {
    e.preventDefault();

    if (falseValues || trueErrors || submitting) {
      return;
    }

    mutate({
      token,
      ...values,
    });
  };

  return (
    <div className={classes.account__data}>
      <h3 className="account__general__title">Account Data</h3>
      <p>
        Welcome to your account! Here you can manage your account data, see
        previous orders and re-do your orders in a faster and better way and
        also reset your password whenever you please.
      </p>

      <div className={classes.account__data__container}>
        <span className={classes.account__data__span}>Email: {email}</span>
        <span className={classes.account__data__span}>
          Username: {username}
        </span>
      </div>
      {address && (
        <div className={classes.account__data__address}>
          <span className={classes.account__data__span}>Address Info</span>
          <ul className={classes.account__data__address__list}>
            {Object.entries(address).map((entry, i) => {
              return (
                <li
                  key={i}
                  className={classes.account__data__address__list__item}
                >
                  {entry[0]
                    .split(/(?=[A-Z])/)
                    .map((string) => string[0].toUpperCase() + string.slice(1))
                    .join(" ")}
                  : {entry[1]}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {!address && (
        <span className={classes.account__data__no__address}>
          No address saved yet
        </span>
      )}
      <button
        onClick={() => setShowForm((prevState) => !prevState)}
        className={classes.account__data__button}
      >
        {buttonText}
      </button>
      {showForm && (
        <form className={classes.account__data__form} onSubmit={submitHandler}>
          {inputObjects.map((inp) => {
            return <FormGroup key={inp.nameProp} {...inp} />;
          })}
          {generalError && (
            <span className={classes.account__data__error__span}>
              {generalError}
            </span>
          )}
          <button
            type="submit"
            disabled={falseValues || trueErrors || submitting}
            className={classes.account__data__form__button}
          >
            {btnText}
          </button>
        </form>
      )}
    </div>
  );
}

export default AccountData;

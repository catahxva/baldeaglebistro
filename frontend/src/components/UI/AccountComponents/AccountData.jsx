import classes from "./AccountData.module.css";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice";
import { useMutation } from "@tanstack/react-query";
import { updateAddress } from "../../../util/requests";

import { useInput } from "../../../hooks/useInput";

import FormGroup from "../Others/FormGroup";

function AccountData() {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  let buttonText = !showForm ? "Address Form" : "Hide Address Form";

  const [submitting, setSubmitting] = useState();
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

  const {
    value: emailValue,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    error: emailError,
  } = useInput(emailDefaultValue, (value) => {
    if (!value) return "Email is required";

    if (!value.includes("@")) return "Please use a valid email address";
  });
  const {
    value: nameValue,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    error: nameError,
  } = useInput(nameDefaultValue, (value) => {
    if (!value) return "Name is required";
  });
  const {
    value: phoneValue,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    error: phoneError,
  } = useInput(phoneDefaultValue, (value) => {
    if (!value) return "Phone is required";
  });
  const {
    value: streetNameValue,
    inputChangeHandler: streetNameChangeHandler,
    inputBlurHandler: streetNameBlurHandler,
    error: streetNameError,
  } = useInput(streetNameDefaultValue, (value) => {
    if (!value) return "Street name is required";
  });
  const {
    value: streetNumberValue,
    inputChangeHandler: streetNumberChangeHandler,
    inputBlurHandler: streetNumberBlurHandler,
    error: streetNumberError,
  } = useInput(streetNumberDefaultValue, (value) => {
    if (!value) return "Street number is required";
  });

  const { mutate } = useMutation({
    mutationFn: updateAddress,
    onMutate: () => {
      setSubmitting(true);
    },
    onError: (error) => {
      setGeneralError(error.message);
      console.log(error);
    },
    onSuccess: (data) => {
      setSubmitting(false);
      console.log(data);

      const addressDB = data.data;

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

      setShowForm(false);
    },
  });

  const submitHandler = function (e) {
    e.preventDefault();

    console.log("wtf?");

    if (
      !emailValue ||
      !nameValue ||
      !phoneValue ||
      !streetNameValue ||
      !streetNumberValue ||
      emailError ||
      nameError ||
      phoneError ||
      streetNameError ||
      streetNumberError
    ) {
      return;
    }

    mutate({
      token,
      email: emailValue,
      name: nameValue,
      phone: phoneValue,
      street: streetNameValue,
      streetNumber: streetNumberValue,
    });
  };

  return (
    <div className={classes.account__data}>
      <h3 className={classes.account__data__title}>Account Data</h3>
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
            <li className={classes.account__data__address__list__item}>
              Name: Cata Hava
            </li>
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
            nameProp="name"
            labelText="Name"
            placeholderText="Your full name"
            value={nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            error={nameError}
          />
          <FormGroup
            nameProp="phone"
            labelText="Phone Number"
            placeholderText="Your phone number"
            value={phoneValue}
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
            error={phoneError}
          />
          <FormGroup
            nameProp="street"
            labelText="Street Name"
            placeholderText="Your street name"
            value={streetNameValue}
            onChange={streetNameChangeHandler}
            onBlur={streetNameBlurHandler}
            error={streetNameError}
          />
          <FormGroup
            nameProp="streetNumber"
            labelText="Street Number"
            placeholderText="Your street number"
            value={streetNumberValue}
            onChange={streetNumberChangeHandler}
            onBlur={streetNumberBlurHandler}
            error={streetNumberError}
          />
          {generalError && (
            <span className={classes.account__data__erorr__span}>
              {generalError}
            </span>
          )}
          <button
            type="submit"
            disabled={
              !emailValue ||
              !nameValue ||
              !phoneValue ||
              !streetNameValue ||
              !streetNumberValue ||
              emailError ||
              nameError ||
              phoneError ||
              streetNameError ||
              streetNumberError ||
              submitting
            }
            className={classes.account__data__form__button}
          >
            Update Address
          </button>
        </form>
      )}
    </div>
  );
}

export default AccountData;

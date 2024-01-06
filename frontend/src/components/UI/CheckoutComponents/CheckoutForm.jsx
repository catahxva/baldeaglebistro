import classes from "./CheckoutForm.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addressActions } from "../../../store/addressSlice";

import { useInput } from "../../../hooks/useInput";

import FormGroup from "../Others/FormGroup";

function CheckoutForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentAddress = useSelector((state) => state.address.address);

  const emailDefaultValue = currentAddress?.email ?? "";
  const nameDefaultValue = currentAddress?.name ?? "";
  const phoneDefaultValue = currentAddress?.phone ?? "";
  const streetNameDefaultValue = currentAddress?.street ?? "";
  const streetNumberDefaultValue = currentAddress?.streetNumber ?? "";
  const deliveryDefaultValue = currentAddress?.carrier ?? "";

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

    if (value.length < 6) return "Name must be at least 6 characters long";
  });
  const {
    value: phoneValue,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    error: phoneError,
  } = useInput(phoneDefaultValue, (value) => {
    if (!value) return "Phone number is required";
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

  const [deliveryValue, setDeliveryValue] = useState(deliveryDefaultValue);

  const submitHandler = function (e) {
    e.preventDefault();

    if (
      !emailError &&
      !nameError &&
      !phoneError &&
      !streetNameError &&
      !streetNumberError &&
      deliveryValue
    ) {
      dispatch(
        addressActions.setAddress({
          email: emailValue,
          name: nameValue,
          phone: phoneValue,
          street: streetNameValue,
          streetNumber: streetNumberValue,
          carrier: deliveryValue,
        })
      );

      navigate("/payment");
    }
  };

  return (
    <form className={classes.checkout__form} onSubmit={submitHandler}>
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
      <div
        className={`${classes.checkout__form__group} ${classes.checkout__form__group__big__margin}`}
      >
        <label
          className={`${classes.checkout__form__label} ${classes.checkout__form__label__big__margin}`}
        >
          Delivery
        </label>
        <div className={classes.checkout__form__container__delivery__big}>
          <div className={classes.checkout__form__container__delivery__small}>
            <div
              onClick={() => {
                setDeliveryValue((prevState) => {
                  if (prevState === "deliveryStandard") {
                    dispatch(
                      addressActions.setCarrier({ delivery: undefined })
                    );

                    return "";
                  }

                  dispatch(
                    addressActions.setCarrier({ delivery: "deliveryStandard" })
                  );

                  return "deliveryStandard";
                });
              }}
              className={`${classes.checkout__form__custom__checkbox} ${
                deliveryValue === "deliveryStandard"
                  ? classes.checkout__form__custom__checkbox__active
                  : ""
              } ${
                deliveryValue === "deliveryExpress"
                  ? classes.checkout__form__custom__checkbox__disabled
                  : ""
              }`}
            ></div>
            <label className={classes.checkout__form__label__checkbox}>
              Standard delivery
            </label>
          </div>
          <div className={classes.checkout__form__container__delivery__small}>
            <div
              onClick={() => {
                setDeliveryValue((prevState) => {
                  if (prevState === "deliveryExpress") {
                    dispatch(
                      addressActions.setCarrier({ delivery: undefined })
                    );

                    return "";
                  }

                  dispatch(
                    addressActions.setCarrier({ delivery: "deliveryExpress" })
                  );

                  return "deliveryExpress";
                });
              }}
              className={`${classes.checkout__form__custom__checkbox} ${
                deliveryValue === "deliveryExpress"
                  ? classes.checkout__form__custom__checkbox__active
                  : ""
              } ${
                deliveryValue === "deliveryStandard"
                  ? classes.checkout__form__custom__checkbox__disabled
                  : ""
              }`}
            ></div>
            <label className={classes.checkout__form__label__checkbox}>
              Express delivery
            </label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className={classes.checkout__form__button}
        disabled={
          !nameValue ||
          !phoneValue ||
          !streetNameValue ||
          !streetNumberValue ||
          !deliveryValue ||
          nameError ||
          phoneError ||
          streetNameError ||
          streetNumberError
        }
      >
        Payment
      </button>
    </form>
  );
}

export default CheckoutForm;

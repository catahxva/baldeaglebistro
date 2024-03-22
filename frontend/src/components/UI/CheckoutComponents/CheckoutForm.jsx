import classes from "./CheckoutForm.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addressActions } from "../../../store/addressSlice";

import { useInput } from "../../../hooks/useInput";
import { useAddressInputs } from "../../../hooks/useAddressInputs";

import { generateFalseValuesTrueErrors } from "../../../util/otherFunctions";

import FormGroup from "../Others/FormGroup";

function CheckoutForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentAddress = useSelector((state) => state.address.address);
  const userAddress = useSelector((state) => state.auth.address);

  let emailDefaultValue;
  let nameDefaultValue;
  let phoneDefaultValue;
  let streetNameDefaultValue;
  let streetNumberDefaultValue;
  let deliveryDefaultValue;

  if ((currentAddress && userAddress) || (currentAddress && !userAddress)) {
    emailDefaultValue = currentAddress.email;
    nameDefaultValue = currentAddress.name;
    phoneDefaultValue = currentAddress.phone;
    streetNameDefaultValue = currentAddress.street;
    streetNumberDefaultValue = currentAddress.streetNumber;
    deliveryDefaultValue = currentAddress.carrier;
  }

  if (!currentAddress && userAddress) {
    emailDefaultValue = userAddress.email;
    nameDefaultValue = userAddress.name;
    phoneDefaultValue = userAddress.phone;
    streetNameDefaultValue = userAddress.street;
    streetNumberDefaultValue = userAddress.streetNumber;
    deliveryDefaultValue = "";
  }

  if (!currentAddress && !userAddress) {
    emailDefaultValue = "";
    nameDefaultValue = "";
    phoneDefaultValue = "";
    streetNameDefaultValue = "";
    streetNumberDefaultValue = "";
    deliveryDefaultValue = "";
  }

  const { inputObjects, values } = useAddressInputs(
    emailDefaultValue,
    nameDefaultValue,
    phoneDefaultValue,
    streetNameDefaultValue,
    streetNumberDefaultValue
  );

  const { falseValues, trueErrors } =
    generateFalseValuesTrueErrors(inputObjects);

  const [deliveryValue, setDeliveryValue] = useState(deliveryDefaultValue);

  const submitHandler = function (e) {
    e.preventDefault();

    if (trueErrors && !deliveryValue) return;

    dispatch(
      addressActions.setAddress({
        carrier: deliveryValue,
        ...values,
      })
    );

    navigate("/payment");
  };

  return (
    <form className={classes.checkout__form} onSubmit={submitHandler}>
      {inputObjects.map((inp) => {
        return <FormGroup key={inp.nameProp} {...inp} />;
      })}
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
        disabled={falseValues || trueErrors || !deliveryValue}
      >
        Payment
      </button>
    </form>
  );
}

export default CheckoutForm;

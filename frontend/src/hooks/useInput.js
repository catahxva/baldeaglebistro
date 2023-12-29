import { useState } from "react";

export const useInput = function (defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const errorMessage = validationFn(enteredValue);

  const inputChangeHandler = function (e) {
    setEnteredValue(e.target.value);

    setDidEdit(false);
  };

  const inputBlurHandler = function () {
    setDidEdit(true);
  };

  return {
    value: enteredValue,
    inputChangeHandler,
    inputBlurHandler,
    error: didEdit && errorMessage,
  };
};

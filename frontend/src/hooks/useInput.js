import { useState, useEffect } from "react";

export const useInput = function (defaultValue, validationFn, backendError) {
  const [enteredValue, setEnteredValue] = useState("");
  const [didEdit, setDidEdit] = useState(false);

  useEffect(() => {
    setEnteredValue(defaultValue || "");
    setDidEdit(false);
  }, [defaultValue]);

  const errorMessage = backendError || validationFn(enteredValue);

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
    error: (didEdit || backendError) && errorMessage,
  };
};

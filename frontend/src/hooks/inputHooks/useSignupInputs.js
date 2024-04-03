import { useInput } from "./inputHooks/useInput";

export const useSignupInputs = function (
  dbErrors,
  validationErrors,
  setDbErrors,
  setValidationErrors
) {
  const userInput = useInput(
    "",
    (value) => {
      if (!value) return "User name is required";
      if (value.length < 6)
        return "User name must be at least 6 characters long";
    },
    validationErrors?.username || dbErrors?.username
  );
  const emailInput = useInput(
    "",
    (value) => {
      if (!value) return "Email is required";
      if (!value.includes("@")) return "Please provide a valid email address";
    },
    validationErrors?.email || dbErrors?.email
  );
  const passwordInput = useInput(
    "",
    (value) => {
      if (!value) return "Password is required";
      if (value.length < 8)
        return "Password must be at least 8 characters long";
    },
    validationErrors?.password
  );
  const passwordConfirmInput = useInput(
    "",
    (value) => {
      if (!value) return "Confirming password is required";
      if (value !== passwordInput.value) return "Passwords must match";
    },
    validationErrors?.passwordConfirm
  );

  const generateOnFocusFn = function (validation, db, field) {
    if (validation && db) {
      return function () {
        setDbErrors((prevState) => {
          delete prevState[field];

          return {
            ...prevState,
          };
        });
        setValidationErrors((prevState) => {
          delete prevState[field];

          return {
            ...prevState,
          };
        });
      };
    }

    if (validation && !db) {
      return function () {
        setValidationErrors((prevState) => {
          delete prevState[field];

          return {
            ...prevState,
          };
        });
      };
    }
  };

  const values = {
    username: userInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    passwordConfirm: passwordConfirmInput.value,
  };

  const inputObjects = [
    {
      nameProp: "username",
      labelText: "User Name",
      placeholderText: "Your user name",
      ...userInput,
      onFocus: generateOnFocusFn(true, true, "username"),
    },
    {
      nameProp: "email",
      type: "email",
      labelText: "Email",
      placeholderText: "Your email",
      ...emailInput,
      onFocus: generateOnFocusFn(true, true, "email"),
    },
    {
      nameProp: "password",
      type: "password",
      labelText: "Password",
      placeholderText: "Your password",
      ...passwordInput,
      onFocus: generateOnFocusFn(true, false, "password"),
    },
    {
      nameProp: "passwordConfirm",
      type: "password",
      labelText: "Confirm password",
      placeholderText: "Confirm your password",
      ...passwordConfirmInput,
      onFocus: generateOnFocusFn(true, false, "passwordConfirm"),
    },
  ];

  return { inputObjects, values };
};

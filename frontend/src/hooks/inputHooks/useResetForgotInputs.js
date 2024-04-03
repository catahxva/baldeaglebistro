import { useInput } from "./inputHooks/useInput";

export const useResetForgotInputs = function () {
  const newPasswordInput = useInput("", (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters long";
  });

  const newPasswordConfirmInput = useInput("", (value) => {
    if (!value) return "Confirming passwords is required";
    if (value !== newPasswordInput.value) return "Passwords must match";
  });

  const values = {
    newPassword: newPasswordInput.value,
    newPasswordConfirm: newPasswordConfirmInput.value,
  };

  const inputObjects = [
    {
      nameProp: "newPassword",
      labelText: "New Password",
      type: "password",
      placeholderText: "Your new password",
      ...newPasswordInput,
    },
    {
      nameProp: "newConfirmPassword",
      labelText: "Confirm New Password",
      type: "password",
      placeholderText: "Confirm your password",
      ...newPasswordConfirmInput,
    },
  ];

  return { inputObjects, values };
};

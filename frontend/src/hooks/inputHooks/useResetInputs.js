import { useInput } from "./inputHooks/useInput";

export const useResetInputs = function (defaultValue) {
  const currentPassInput = useInput(defaultValue, (value) => {
    if (!value) return "Current password is required";
  });

  const newPassInput = useInput(defaultValue, (value) => {
    if (!value) return "New password is required";

    if (value.length < 8)
      return "New password must be at least 8 characters long";
  });

  const newPassConfirmInput = useInput(defaultValue, (value) => {
    if (!value) return "Confirming your new password is required";

    if (value !== newPassInput.value) return "Passwords must match";
  });

  const values = {
    currentPassword: currentPassInput.value,
    newPassword: newPassInput.value,
    newPassConfirm: newPassConfirmInput.value,
  };

  const inputObjects = [
    {
      nameProp: "currentPassword",
      labelText: "Current Password",
      placeholderText: "Your current password",
      type: "password",
      ...currentPassInput,
    },
    {
      nameProp: "newPassword",
      labelText: "New Password",
      placeholderText: "Your new password",
      type: "password",
      ...newPassInput,
    },
    {
      nameProp: "newPasswordConfirm",
      labelText: "Confirm Password",
      placeholderText: "Confirm your password",
      type: "password",
      ...newPassConfirmInput,
    },
  ];

  return { inputObjects, values };
};

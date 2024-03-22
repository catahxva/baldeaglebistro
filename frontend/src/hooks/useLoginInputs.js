import { useInput } from "./useInput";

export const useLoginInputs = function () {
  const emailInput = useInput("", (value) => {
    if (!value) return "Email is required";
    if (!value.includes("@")) return "Please provide a valid email";
  });

  const passwordInput = useInput("", (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters long";
  });

  const values = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  const inputObjects = [
    {
      nameProp: "email",
      labelText: "Email",
      type: "email",
      placeholderText: "Your account email",
      ...emailInput,
    },
    {
      nameProp: "password",
      labelText: "Password",
      type: "password",
      placeholderText: "Your account password",
      ...passwordInput,
    },
  ];

  return { inputObjects, values };
};

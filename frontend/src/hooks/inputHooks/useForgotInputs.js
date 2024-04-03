import { useInput } from "./useInput";

export const useForgotPassInputs = function () {
  const emailInput = useInput("", (value) => {
    if (!value) return "Email is required";
    if (!value.includes("@")) return "Please provide a valid email address";
  });

  const values = {
    email: emailInput.value,
  };

  const inputObjects = [
    {
      nameProp: "email",
      labelText: "Email",
      type: "email",
      placeholderText: "Your account email",
      ...emailInput,
    },
  ];

  return { inputObjects, values };
};

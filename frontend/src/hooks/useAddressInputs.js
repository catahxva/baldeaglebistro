import { useInput } from "./useInput";

export const useAddressInputs = function (
  emailDefaultValue,
  nameDefaultValue,
  phoneDefaultValue,
  streetNameDefaultValue,
  streetNumberDefaultValue
) {
  const emailInput = useInput(emailDefaultValue, (value) => {
    if (!value) return "Email is required";

    if (!value.includes("@")) return "Please use a valid email address";
  });
  const nameInput = useInput(nameDefaultValue, (value) => {
    if (!value) return "Name is required";
  });
  const phoneInput = useInput(phoneDefaultValue, (value) => {
    if (!value) return "Phone is required";
  });
  const streetInput = useInput(streetNameDefaultValue, (value) => {
    if (!value) return "Street name is required";
  });
  const streetNumberInput = useInput(streetNumberDefaultValue, (value) => {
    if (!value) return "Street number is required";
  });

  const values = {
    email: emailInput.value,
    name: nameInput.value,
    phone: phoneInput.value,
    street: streetInput.value,
    streetNumber: streetNumberInput.value,
  };

  const inputObjects = [
    {
      nameProp: "email",
      labelText: "Email",
      type: "email",
      placeholderText: "Your email",
      ...emailInput,
    },
    {
      nameProp: "name",
      labelText: "Name",
      placeholderText: "Your full name",
      ...nameInput,
    },
    {
      nameProp: "phone",
      labelText: "Phone Number",
      placeholderText: "Your phone number",
      ...phoneInput,
    },
    {
      nameProp: "street",
      labelText: "Street Name",
      placeholderText: "Your street name",
      ...streetInput,
    },
    {
      nameProp: "streetNumber",
      labelText: "Street Number",
      placeholderText: "Your street number",
      ...streetNumberInput,
    },
  ];

  return { inputObjects, values };
};

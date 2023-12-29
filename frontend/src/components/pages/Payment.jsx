import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CheckoutProcessProgress from "../UI/Others/CheckoutProcessProgress";

function Payment() {
  const navigate = useNavigate();

  const currentAddress = useSelector((state) => state.address.address);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (cartItems.length === 0) navigate("/cart");
    if (cartItems.length > 0 && !currentAddress) navigate("/checkout");
  }, []);

  return (
    <>
      <CheckoutProcessProgress stage="payment" />
    </>
  );
}

export default Payment;

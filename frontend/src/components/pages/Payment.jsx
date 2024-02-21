import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CheckoutProcessProgress from "../UI/Others/CheckoutProcessProgress";
import PaymentContent from "../UI/PaymentComponents/PaymentContent";

function Payment() {
  const navigate = useNavigate();

  const currentAddress = useSelector((state) => state.address.address);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (cartItems.length === 0) navigate("/cart");
    if (cartItems.length > 0 && !currentAddress) navigate("/checkout");
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CheckoutProcessProgress stage="payment" />
      <PaymentContent />
    </>
  );
}

export default Payment;

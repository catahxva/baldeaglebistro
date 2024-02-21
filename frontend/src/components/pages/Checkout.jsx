import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CheckoutProcessProgress from "../UI/Others/CheckoutProcessProgress";
import CheckoutContent from "../UI/CheckoutComponents/CheckoutContent";

function Checkout() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (cartItems.length <= 0) navigate("/cart");
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CheckoutProcessProgress stage="checkout" />
      <CheckoutContent />
    </>
  );
}

export default Checkout;

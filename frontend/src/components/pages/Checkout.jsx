import { useEffect } from "react";

import CheckoutProcessProgress from "../UI/Others/CheckoutProcessProgress";
import CheckoutContent from "../UI/CheckoutComponents/CheckoutContent";

function Checkout() {
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

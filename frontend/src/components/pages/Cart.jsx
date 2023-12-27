import { useEffect } from "react";

import CheckoutProcessProgress from "../UI/Others/CheckoutProcessProgress";
import CartList from "../UI/CartComponents/CartList";

function Cart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CheckoutProcessProgress stage="cart" />
      <CartList />
    </>
  );
}

export default Cart;

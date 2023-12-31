import OrderSuccessContent from "../UI/OrderSuccessComponents/OrderSuccessContent";

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { useEffect } from "react";

function OrderSuccess() {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(cartActions.clearCart());
  }, []);

  return <OrderSuccessContent />;
}

export default OrderSuccess;

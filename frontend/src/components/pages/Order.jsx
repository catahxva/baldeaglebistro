import { useEffect } from "react";

import OrderContent from "../UI/OrderComponents/OrderContent";

function Order() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <OrderContent />;
}

export default Order;

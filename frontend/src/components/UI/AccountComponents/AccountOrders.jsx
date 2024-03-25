import classes from "./AccountOrders.module.css";

import { useGetOrdersContent } from "../../../hooks/useGetOrdersContent";

function AccountOrders() {
  const content = useGetOrdersContent();

  return (
    <div className={classes.account__orders}>
      <h3 className="account__general__title">Your orders</h3>
      {content}
    </div>
  );
}

export default AccountOrders;

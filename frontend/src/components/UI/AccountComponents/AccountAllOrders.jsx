import classes from "./AccountAllOrders.module.css";

import { useGetOrdersContent } from "../../../hooks/useGetOrdersContent";

function AccountAllOrders() {
  const content = useGetOrdersContent("all");

  return (
    <div className={classes.account__all__orders__container}>
      <h3 className="account__general__title">All Orders</h3>
      {content}
    </div>
  );
}

export default AccountAllOrders;

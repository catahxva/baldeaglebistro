import classes from "./AccountAllOrders.module.css";

import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";

function AccountAllOrders() {
  const userToken = useSelector((state) => state.auth.token);

  return (
    <div className={classes.account__all__orders__container}>
      <h3 className={classes.account__all__orders__title}>All Orders</h3>
    </div>
  );
}

export default AccountAllOrders;

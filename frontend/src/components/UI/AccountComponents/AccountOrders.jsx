import classes from "./AccountOrders.module.css";

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../../../util/requests";

import Placeholder from "../Others/Placeholder";
import OrdersList from "../Others/OrdersList";

function AccountOrders() {
  const userToken = useSelector((state) => state.auth.token);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["userOrders", userToken],
    queryFn: ({ signal }) => getUserOrders(signal, userToken),
  });

  let content;

  if (isPending) content = <Placeholder type="loading" />;

  if (isError) content = <Placeholder type="error" message={error.message} />;

  if (data && data.data.data.length <= 0)
    content = (
      <span className={classes.account__orders__span__none}>
        You don't have any orders yet
      </span>
    );

  if (data && data.data.data.length > 0) {
    const orders = data.data.data;

    content = <OrdersList orders={orders} />;
  }

  return (
    <div className={classes.account__orders}>
      <h3 className="account__general__title">Your orders</h3>
      {content}
    </div>
  );
}

export default AccountOrders;

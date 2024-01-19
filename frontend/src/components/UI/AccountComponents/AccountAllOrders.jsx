import classes from "./AccountAllOrders.module.css";

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../../util/requests";

import Placeholder from "../Others/Placeholder";
import OrdersList from "../Others/OrdersList";

function AccountAllOrders() {
  const userToken = useSelector((state) => state.auth.token);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["allOrders", userToken],
    queryFn: ({ signal }) => getAllOrders(signal, userToken),
  });

  let content;

  if (isPending) content = <Placeholder type="loading" />;

  if (isError) content = <Placeholder type="error" message={error.message} />;

  if (data && data.data.data.length <= 0) {
    content = (
      <span className={classes.account__all__orders__span__none}>
        There have been no orders placed yet
      </span>
    );
  }

  if (data && data.data.data.length > 0) {
    const orders = data.data.data;

    content = <OrdersList orders={orders} listType="all" />;
  }

  return (
    <div className={classes.account__all__orders__container}>
      <h3 className={classes.account__all__orders__title}>All Orders</h3>
      {content}
    </div>
  );
}

export default AccountAllOrders;

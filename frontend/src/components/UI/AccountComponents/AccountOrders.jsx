import classes from "./AccountOrders.module.css";

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../../../util/requests";

import Placeholder from "../Others/Placeholder";

function AccountOrders() {
  const userToken = useSelector((state) => state.auth.token);

  console.log(userToken);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["userOrders", userToken],
    queryFn: ({ signal }) => getUserOrders(signal, userToken),
  });

  let content;

  if (isPending) content = <Placeholder type="loading" />;

  if (data) console.log(data);

  if (data && data.data.data.length <= 0)
    content = (
      <span className={classes.account__orders__span__none}>
        You don't have any orders yet
      </span>
    );

  if (isError) content = <Placeholder type="error" message={error.message} />;

  if (data && data.data.data.length > 0) {
    const orders = data.data.data;

    content = (
      <div className={classes.account__orders__list}>
        <div className={classes.account__order}>
          <div>
            <span className={classes.account__order__title}>Order #934BFA</span>
            <span className={classes.account__order__date}>
              14 January, 2024
            </span>
          </div>
          <div>
            <span className={classes.account__order__span}>Products: 3</span>
            <span className={classes.account__order__span}>Paid: 130$</span>
          </div>
          <span>See order</span>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.account__orders}>
      <h3 className={classes.account__orders__title}>Your orders</h3>
      {content}
    </div>
  );
}

export default AccountOrders;

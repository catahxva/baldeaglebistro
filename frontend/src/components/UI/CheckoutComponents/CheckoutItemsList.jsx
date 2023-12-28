import classes from "./CheckoutItemsList.module.css";

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { obtainCartProducts } from "../../../util/requests";

import CheckoutItem from "./CheckoutItem";
import Placeholder from "../Others/Placeholder";

function CheckoutItemsList() {
  const cartItems = useSelector((state) => state.cart.items);

  let content;

  return <div>{content}</div>;
}

export default CheckoutItemsList;

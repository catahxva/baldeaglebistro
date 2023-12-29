import classes from "./CheckoutItem.module.css";

function CheckoutItem({ item }) {
  console.log(item);

  return (
    <div className={classes.checkout__item}>
      <div>
        <span className={classes.checkout__item__name}>{item.name}</span>
        <span className={classes.checkout__item__category}>
          {item.category}
        </span>
        <span className={classes.checkout__item__span}>
          Quantity: {item.quantity}
        </span>
      </div>
      <div>
        <span className={classes.checkout__item__span}>{item.price}$</span>
      </div>
    </div>
  );
}

export default CheckoutItem;

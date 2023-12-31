import classes from "./Item.module.css";

function Item({ item }) {
  return (
    <div className={classes.item}>
      <div>
        <span className={classes.item__name}>{item.name}</span>
        <span className={classes.item__category}>{item.category}</span>
        <span className={classes.item__span}>Quantity: {item.quantity}</span>
      </div>
      <div>
        <span className={classes.item__span}>{item.price}$</span>
      </div>
    </div>
  );
}

export default Item;

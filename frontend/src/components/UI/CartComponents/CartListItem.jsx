import classes from "./CartListItem.module.css";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cartSlice";

function CartListItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className={classes.cart__item}>
      <div className={classes.cart__item__container__info}>
        <Link to={`/product/${item.id}`} className={classes.cart__item__name}>
          {item.name}
        </Link>
        <span className={classes.cart__item__category}>{item.category}</span>
      </div>
      <div className={classes.cart__item__container}>
        <span className={classes.cart__item__span}>{item.price}$</span>
      </div>
      <div className={classes.cart__item__container__big}>
        <div className={classes.cart__item__container__quantity__controller}>
          <button
            onClick={() => {
              if (item.quantity > 1)
                dispatch(cartActions.decreaseQuantity({ id: item.id }));

              if (item.quantity <= 1)
                dispatch(cartActions.removeProduct({ id: item.id }));
            }}
            className={`${classes.cart__item__btn} ${classes.cart__item__btn__quantity}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${classes.cart__item__svg}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </button>
          <div className={classes.cart__item__container}>
            <span className={classes.cart__item__span}>{item.quantity}</span>
          </div>
          <button
            onClick={() =>
              dispatch(cartActions.increaseQuantity({ id: item.id }))
            }
            className={`${classes.cart__item__btn} ${classes.cart__item__btn__quantity}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${classes.cart__item__svg}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        <button
          onClick={() => dispatch(cartActions.removeProduct({ id: item.id }))}
          className={classes.cart__item__btn}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 ${classes.cart__item__svg}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CartListItem;

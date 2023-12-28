import classes from "./CartRecommendationItem.module.css";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addProductToCart } from "../../../store/cartActions";

function CartRecommendationItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className={classes.cart__rec__item}>
      <div className={classes.cart__rec__item__container}>
        <Link
          to={`/product/${item._id}`}
          className={classes.cart__rec__item__container__img}
        >
          <img src={item.image} className={classes.cart__rec__item__img} />
        </Link>
        <div className={classes.cart__rec__item__container__info}>
          <span className={classes.cart__rec__item__name}>{item.name}</span>
          <span className={classes.cart__rec__item__calories}>
            {item.nutrition.calories} cal
          </span>
          <span className={classes.cart__rec__item__price}>{item.price}$</span>
        </div>
      </div>
      <button
        onClick={() => dispatch(addProductToCart(item._id, 1))}
        disabled={!item.available}
        className={classes.cart__rec__item__btn}
      >
        {item.available ? "Add to cart" : "Unavailable"}
      </button>
    </div>
  );
}

export default CartRecommendationItem;

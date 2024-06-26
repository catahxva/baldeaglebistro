import classes from "./ProductCard.module.css";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addProductToCart } from "../../../store/customActions/cartActions";

function ProductCard({ product, productType }) {
  const dispatch = useDispatch();

  return (
    <div
      className={`${classes.product__card} ${
        productType === "slider" ? classes.product__card__slider__width : ""
      }`}
    >
      <Link
        to={`/product/${product._id}`}
        className={classes.product__card__container__img}
      >
        <img className={classes.product__card__img} src={product.image} />
      </Link>
      <div className={classes.product__card__container__info}>
        <span className={classes.product__card__name}>{product.name}</span>
        <span className={classes.product__card__category}>
          {product.category}
        </span>
        <div className={classes.product__card__container__flex}>
          <span className={classes.product__card__span}>
            Serving: {product.serving}g
          </span>
          <span className={classes.product__card__span}>
            {product.nutrition.calories} cal
          </span>
        </div>
        <span className={classes.product__card__price}>
          {product.price}$ for serving
        </span>
        <div className={classes.product__card__container__flex}>
          <Link
            to={`/product/${product._id}`}
            className={classes.product__card__button}
          >
            Details
          </Link>
          <button
            className={classes.product__card__button}
            disabled={!product.available}
            onClick={() => dispatch(addProductToCart(product._id, 1))}
          >
            {product.available ? "Add to cart" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

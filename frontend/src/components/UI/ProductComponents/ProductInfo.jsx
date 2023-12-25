import classes from "./ProductInfo.module.css";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { fetchProduct } from "../../../util/requests";

import Placeholder from "../Others/Placeholder";

function ProductInfo() {
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: ({ signal }) => fetchProduct(signal, id),
  });

  let content;

  if (isPending) content = <Placeholder type="loading" size="big" />;

  if (isError) content = <Placeholder type="error" message={error.message} />;

  if (data) {
    const product = data.data.data;

    const price = product.price * quantity;
    const servings = product.serving * quantity;
    const proteinQuantity = product.nutrition.protein * quantity;
    const carbsQuantity = product.nutrition.carbs * quantity;
    const fatsQuantity = product.nutrition.fats * quantity;

    content = (
      <>
        <h2>{product.name}</h2>
        <div className={classes.product__info__grid}>
          <div className={classes.product__info__container__img}>
            <img src={product.image} className={classes.product__info__img} />
          </div>
          <div>
            <h3 className={classes.product__info__category}>
              {product.category}
            </h3>
            <p>{product.description}</p>
            <div className={classes.product__info__container__nutrition}>
              <p className={classes.product__info__nutrition__title}>
                Nutrition values for selected serving ({servings}g)
              </p>
              <div className={classes.product__info__nutrition__row}>
                <span className={classes.product__info__nutrition__macro}>
                  Protein
                </span>
                <span className={classes.product__info__nutrition__value}>
                  {proteinQuantity}g
                </span>
              </div>
              <div className={classes.product__info__nutrition__row}>
                <span className={classes.product__info__nutrition__macro}>
                  Carbohydrates
                </span>
                <span className={classes.product__info__nutrition__value}>
                  {carbsQuantity}g
                </span>
              </div>
              <div className={classes.product__info__nutrition__row}>
                <span className={classes.product__info__nutrition__macro}>
                  Fats
                </span>
                <span className={classes.product__info__nutrition__value}>
                  {fatsQuantity}g
                </span>
              </div>
            </div>
            <div className={classes.product__info__container__price}>
              <span className={classes.product__info__price}>{price}$</span>
              {product.available && (
                <div className={classes.product__info__quantity__controller}>
                  <div
                    className={
                      classes.product__info__quantity__controller__buttons
                    }
                  >
                    <button
                      className={classes.product__info__btn}
                      onClick={() =>
                        setQuantity((prevQuantity) => {
                          if (prevQuantity === 1) return prevQuantity;
                          return prevQuantity - 1;
                        })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-6 h-6 ${classes.product__info__svg}`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14"
                        />
                      </svg>
                    </button>
                    <span className={classes.product__info__quantity}>
                      {quantity}
                    </span>
                    <button
                      className={classes.product__info__btn}
                      onClick={() =>
                        setQuantity((prevQuantity) => prevQuantity + 1)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-6 h-6 ${classes.product__info__svg}`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                  </div>
                  <button className={classes.product__info__btn__add}>
                    Add To Cart
                  </button>
                </div>
              )}
              {!product.available && (
                <span className={classes.product__info__span}>
                  Currently unavailable
                </span>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return <section className="first__section">{content}</section>;
}

export default ProductInfo;

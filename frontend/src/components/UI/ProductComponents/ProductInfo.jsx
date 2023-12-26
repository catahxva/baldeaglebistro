import classes from "./ProductInfo.module.css";

import { useState } from "react";

import RatingModal from "./RatingModal";

function ProductInfo({ product }) {
  const [activeModal, setActiveModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const price = product.price * quantity;
  const servings = product.serving * quantity;
  const proteinQuantity = product.nutrition.protein * quantity;
  const carbsQuantity = product.nutrition.carbs * quantity;
  const fatsQuantity = product.nutrition.fats * quantity;

  const utilityArray = new Array(5).fill(0);

  return (
    <section className="first__section">
      <RatingModal
        active={activeModal}
        closeModal={setActiveModal}
        id={product._id}
      />
      <h2>{product.name}</h2>
      <div className={classes.product__info__grid}>
        <div className={classes.product__info__container__img}>
          <img src={product.image} className={classes.product__info__img} />
        </div>
        <div>
          <h3 className={classes.product__info__category}>
            {product.category}
          </h3>
          <div className={classes.product__info__container__rating}>
            {product.rating > 0 && (
              <div className={classes.product__info__container__stars}>
                {utilityArray.map((el, i) => {
                  return (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-6 h-6 ${classes.product__info__star} ${
                        i + 1 <= product.rating
                          ? classes.product__info__star__active
                          : ""
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  );
                })}
              </div>
            )}
            {product.rating <= 0 && (
              <span className={classes.product__info__no__rating}>
                No rating yet
              </span>
            )}
            <button
              onClick={() => setActiveModal(true)}
              className={classes.product__info__big__btn}
            >
              Rate it
            </button>
          </div>
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
                <button
                  className={`${classes.product__info__big__btn} ${classes.product__info__btn__add}`}
                >
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
    </section>
  );
}

export default ProductInfo;

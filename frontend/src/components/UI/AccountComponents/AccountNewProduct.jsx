import classes from "./AccountNewProduct.module.css";

import { useRef, useState } from "react";
import { useInput } from "../../../hooks/useInput";
import { useMutation } from "@tanstack/react-query";

import FormGroup from "../Others/FormGroup";

function AccountNewProduct() {
  const selectCategoryRef = useRef();

  const [submitting, setSubmitting] = useState();
  const btnText = submitting ? "Submitting" : "Upload Product";

  const { mutate } = useMutation({});

  const {
    value: nameValue,
    inputChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameBlurHandler,
    erorr: nameError,
  } = useInput(undefined, (value) => {
    if (!value) return "Name is required";
  });
  const {
    value: descriptionValue,
    inputChangeHandler: descriptionInputChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    erorr: descriptionError,
  } = useInput(undefined, (value) => {
    if (!value) return "Description is required";
  });
  const {
    value: priceValue,
    inputChangeHandler: priceInputChangeHandler,
    inputBlurHandler: priceBlurHandler,
    erorr: priceError,
  } = useInput(undefined, (value) => {
    if (!value) return "Price is required!";

    if (value <= 0) return "Price cannot have a negative value";
  });
  const {
    value: servingValue,
    inputChangeHandler: servingInputChangeHandler,
    inputBlurHandler: servingBlurHandler,
    erorr: servingError,
  } = useInput(undefined, (value) => {
    if (!value) return "Serving size is required!";

    if (value <= 0) return "Serving size cannot have a negative value";
  });
  const { value: pictureValue, inputChangeHandler: pictureInputChangeHandler } =
    useInput(undefined, (value) => {
      if (!value) return "Picture is required";
    });
  const {
    value: caloriesValue,
    inputChangeHandler: caloriesInputChangeHandler,
    inputBlurHandler: caloriesBlurHandler,
    erorr: caloriesError,
  } = useInput(undefined, (value) => {
    if (!value) return "Calories field is required!";

    if (value <= 0) return "Calories cannot have a negative value";
  });
  const {
    value: proteinValue,
    inputChangeHandler: proteinInputChangeHandler,
    inputBlurHandler: proteinBlurHandler,
    erorr: proteinError,
  } = useInput(undefined, (value) => {
    if (!value) return "Protein field is required!";
  });
  const {
    value: carbsValue,
    inputChangeHandler: carbsInputChangeHandler,
    inputBlurHandler: carbsBlurHandler,
    erorr: carbsError,
  } = useInput(undefined, (value) => {
    if (!value) return "Carbs field is required!";
  });
  const {
    value: fatsValue,
    inputChangeHandler: fatsInputChangeHandler,
    inputBlurHandler: fatsBlurHandler,
    erorr: fatsError,
  } = useInput(undefined, (value) => {
    if (!value) return "Fats field is required!";
  });

  console.log(pictureValue);

  return (
    <div className={classes.account__new__product__container}>
      <h3 className="account__general__title">New Product</h3>
      <form className={classes.account__new__product__form}>
        <div className={classes.account__new__product__form__big__group}>
          <h4
            className={classes.account__new__product__form__big__group__title}
          >
            General Data
          </h4>
          <FormGroup
            nameProp="name"
            labelText="Product Name"
            placeholderText="Product Name"
            value={nameValue}
            onChange={nameInputChangeHandler}
            onBlur={nameBlurHandler}
            error={nameError}
          />
          <FormGroup
            nameProp="price"
            labelText="Product Price"
            placeholderText="Product Price"
            type="number"
            value={priceValue}
            onChange={priceInputChangeHandler}
            onBlur={priceBlurHandler}
            error={priceError}
          />
          <FormGroup
            nameProp="serving"
            labelText="Serving Size"
            placeholderText="Serving size of the product"
            type="number"
            value={servingValue}
            onChange={servingInputChangeHandler}
            onBlur={servingBlurHandler}
            error={servingError}
          />
          <FormGroup
            nameProp="description"
            labelText="Description"
            placeholderText="Product description"
            elementType="textarea"
            value={descriptionValue}
            onChange={descriptionInputChangeHandler}
            onBlur={descriptionBlurHandler}
            error={descriptionError}
          />
          <div className={classes.account__new__product__group}>
            <label
              className={classes.account__new__product__label}
              htmlFor="category"
            >
              Product Category
            </label>
            <select
              ref={selectCategoryRef}
              className={classes.account__new__product__category__select}
              name="category"
            >
              <option>Select</option>
              <option value="main dish">Main Dish</option>
              <option value="side">Side</option>
              <option value="appetizer">Appetizer</option>
              <option value="dessert">Dessert</option>
              <option value="beverage">Beverage</option>
            </select>
          </div>
          <div className={classes.account__new__product__group}>
            <label
              className={classes.account__new__product__label}
              htmlFor="image"
            >
              Product Picture
            </label>
            <div className={classes.account__new__product__helper__file}>
              <label className={classes.account__new__product__container__file}>
                Select image
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={pictureInputChangeHandler}
                  className={classes.account__new__product__file}
                ></input>
              </label>
              {pictureValue && (
                <span className={classes.account__new__product__file__name}>
                  {pictureValue.split(`\\`).pop()}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={classes.account__new__product__form__big__group}>
          <h4
            className={classes.account__new__product__form__big__group__title}
          >
            Nutritional Facts
          </h4>
          <FormGroup
            nameProp="calories"
            labelText="Calories"
            placeholderText="Calories of the product"
            type="number"
            value={caloriesValue}
            onChange={caloriesInputChangeHandler}
            onBlur={caloriesBlurHandler}
            error={caloriesError}
          />
          <FormGroup
            nameProp="protein"
            labelText="Protein"
            placeholderText="Protein of the product"
            type="number"
            value={proteinValue}
            onChange={proteinInputChangeHandler}
            onBlur={proteinBlurHandler}
            error={proteinError}
          />
          <FormGroup
            nameProp="carbs"
            labelText="Carbohydrates"
            placeholderText="Carbs of the product"
            type="number"
            value={carbsValue}
            onChange={carbsInputChangeHandler}
            onBlur={carbsBlurHandler}
            error={carbsError}
          />
          <FormGroup
            nameProp="fats"
            labelText="Fats"
            placeholderText="Fats of the product"
            type="number"
            value={fatsValue}
            onChange={fatsInputChangeHandler}
            onBlur={fatsBlurHandler}
            error={fatsError}
          />
        </div>
        <button className={classes.account__new__product__form__button}>
          Upload Product
        </button>
      </form>
    </div>
  );
}

export default AccountNewProduct;

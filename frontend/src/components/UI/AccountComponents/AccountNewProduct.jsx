import classes from "./AccountNewProduct.module.css";

import { useRef, useState } from "react";
import { useInput } from "../../../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../../store/uiSlice";
import { useMutation } from "@tanstack/react-query";
import { uploadProduct } from "../../../util/requests";

import FormGroup from "../Others/FormGroup";

function AccountNewProduct() {
  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.auth.token);
  const selectCategoryRef = useRef();
  const availabilityRef = useRef();

  const [file, setFile] = useState();

  const fileChange = function (e) {
    setFile(e.target.files[0]);
  };

  const [submitting, setSubmitting] = useState();
  const btnText = submitting ? "Submitting" : "Upload Product";

  const [defaultInputValue, setDefaultInputValue] = useState("");

  const {
    value: nameValue,
    inputChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameBlurHandler,
    erorr: nameError,
  } = useInput(defaultInputValue, (value) => {
    if (!value) return "Name is required";
  });
  const {
    value: descriptionValue,
    inputChangeHandler: descriptionInputChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    erorr: descriptionError,
  } = useInput(defaultInputValue, (value) => {
    if (!value) return "Description is required";
  });
  const {
    value: priceValue,
    inputChangeHandler: priceInputChangeHandler,
    inputBlurHandler: priceBlurHandler,
    erorr: priceError,
  } = useInput(defaultInputValue, (value) => {
    if (!value) return "Price is required!";

    if (value <= 0) return "Price cannot have a negative value";
  });
  const {
    value: servingValue,
    inputChangeHandler: servingInputChangeHandler,
    inputBlurHandler: servingBlurHandler,
    erorr: servingError,
  } = useInput(defaultInputValue, (value) => {
    if (!value) return "Serving size is required!";

    if (value <= 0) return "Serving size cannot have a negative value";
  });
  const {
    value: caloriesValue,
    inputChangeHandler: caloriesInputChangeHandler,
    inputBlurHandler: caloriesBlurHandler,
    erorr: caloriesError,
  } = useInput(defaultInputValue, (value) => {
    if (!value) return "Calories field is required!";

    if (value <= 0) return "Calories cannot have a negative value";
  });
  const {
    value: proteinValue,
    inputChangeHandler: proteinInputChangeHandler,
    inputBlurHandler: proteinBlurHandler,
    erorr: proteinError,
  } = useInput(defaultInputValue, (value) => {
    if (!value) return "Protein field is required!";
  });
  const {
    value: carbsValue,
    inputChangeHandler: carbsInputChangeHandler,
    inputBlurHandler: carbsBlurHandler,
    erorr: carbsError,
  } = useInput(defaultInputValue, (value) => {
    if (!value) return "Carbs field is required!";
  });
  const {
    value: fatsValue,
    inputChangeHandler: fatsInputChangeHandler,
    inputBlurHandler: fatsBlurHandler,
    erorr: fatsError,
  } = useInput(defaultInputValue, (value) => {
    if (!value) return "Fats field is required!";
  });

  const { mutate } = useMutation({
    mutationFn: uploadProduct,
    onMutate: () => {
      setSubmitting(true);
    },
    onError: (error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: error.message,
        })
      );
    },
    onSuccess: () => {
      dispatch(
        uiActions.showNotification({
          status: "success",
          message: "Product uploaded successfully!",
        })
      );

      setDefaultInputValue((prevState) => {
        if (prevState === "") return undefined;

        if (prevState === undefined) return "";
      });

      setFile(undefined);

      selectCategoryRef.current.value = "";
      availabilityRef.current.value = "";
    },
    onSettled: () => {
      setSubmitting(false);

      setTimeout(() => {
        dispatch(uiActions.hideNotification());
      }, 4000);
    },
  });

  const formHandler = function (e) {
    e.preventDefault();

    if (
      !nameValue ||
      !priceValue ||
      !servingValue ||
      !descriptionValue ||
      !caloriesValue ||
      !proteinValue ||
      !carbsValue ||
      !fatsValue ||
      !selectCategoryRef.current.value ||
      !availabilityRef.current.value ||
      !file ||
      nameError ||
      priceError ||
      servingError ||
      descriptionError ||
      caloriesError ||
      proteinError ||
      carbsError ||
      fatsError ||
      submitting
    )
      return;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("name", nameValue);
    formData.append("category", selectCategoryRef.current.value);
    formData.append("description", descriptionValue);
    formData.append("availability", availabilityRef.current.value);
    formData.append("price", priceValue);
    formData.append("serving", servingValue);
    formData.append("calories", caloriesValue);
    formData.append("protein", proteinValue);
    formData.append("carbs", carbsValue);
    formData.append("fats", fatsValue);

    mutate({
      productData: formData,
      token: userToken,
    });
  };

  return (
    <div className={classes.account__new__product__container}>
      <h3 className="account__general__title">New Product</h3>
      <form
        className={classes.account__new__product__form}
        onSubmit={formHandler}
      >
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
              className={classes.account__new__product__select}
              name="category"
            >
              <option value="">Select</option>
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
              htmlFor="availability"
            >
              Product Availability
            </label>
            <select
              ref={availabilityRef}
              className={classes.account__new__product__select}
              name="availability"
            >
              <option value="">Select</option>
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
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
                  onChange={fileChange}
                  className={classes.account__new__product__file}
                ></input>
              </label>
              {file && (
                <span className={classes.account__new__product__file__name}>
                  {file.name}
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
        <button
          disabled={
            !nameValue ||
            !priceValue ||
            !servingValue ||
            !descriptionValue ||
            !file ||
            !caloriesValue ||
            !proteinValue ||
            !carbsValue ||
            !fatsValue ||
            nameError ||
            priceError ||
            servingError ||
            descriptionError ||
            caloriesError ||
            proteinError ||
            carbsError ||
            fatsError ||
            submitting
          }
          className={classes.account__new__product__form__button}
        >
          {btnText}
        </button>
      </form>
    </div>
  );
}

export default AccountNewProduct;

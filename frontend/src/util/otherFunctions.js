import { cartActions } from "../store/cartSlice";

export const processCartData = function (items, unavailableItems, dispatchFn) {
  const availableItems = items.filter(
    (item) =>
      item.notFound === undefined &&
      item.notAvailable === undefined &&
      item.error === undefined
  );

  const totalPrice = availableItems.reduce(
    (acc, current) => acc + current.price,
    0
  );

  const noDrink =
    availableItems.filter((item) => item.category === "beverage").length <= 0;

  const noDessert =
    availableItems.filter((item) => item.category === "dessert").length <= 0;

  const unavailableCartItems = items.filter(
    (item) =>
      item.notFound === true ||
      item.notAvailable === true ||
      item.error === true
  );

  dispatchFn(
    cartActions.addUnavailableItems({ unavailableItems: unavailableCartItems })
  );

  const unavailableItemsMessage =
    unavailableItems.length > 0
      ? "Some of the items inside your cart are unavailable so they have been removed"
      : "";

  unavailableCartItems.forEach((item) => {
    dispatchFn(cartActions.removeProduct({ id: item.itemId }));
  });

  return {
    availableItems,
    totalPrice,
    noDrink,
    noDessert,
    unavailableItemsMessage,
  };
};

export const generateFalseValuesTrueErrors = function (arr) {
  const falseValues = arr.map((el) => el.value).some((val) => !val);
  const trueErrors = arr.map((el) => el.error).some((err) => err);

  return { falseValues, trueErrors };
};

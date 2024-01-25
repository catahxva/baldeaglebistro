import classes from "./AccountProductModal.module.css";

import { useSelector } from "react-redux";

function AccountProductModal({
  closeModal,
  deleteProduct,
  id,
  error,
  btnText,
}) {
  const userToken = useSelector((state) => state.auth.token);

  return (
    <div className={classes.delete__modal}>
      <div className={classes.delete__modal__card}>
        <span className={classes.delete__modal__span}>
          {error || "Are you sure you want to delete this product?"}
        </span>
        <div className={classes.delete__modal__container__buttons}>
          <button
            onClick={() => closeModal(false)}
            className={`${classes.delete__modal__button} ${classes.delete__modal__button__cancel}`}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              deleteProduct({ id, token: userToken });
            }}
            className={`${classes.delete__modal__button} ${classes.delete__modal__button__delete}`}
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountProductModal;

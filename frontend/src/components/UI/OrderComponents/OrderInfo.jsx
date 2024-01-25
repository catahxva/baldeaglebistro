import classes from "./OrderInfo.module.css";

function OrderInfo({ order }) {
  console.log(order.products);

  return (
    <div className={classes.order__info}>
      <h3 className={classes.order__info__title}>Order Information</h3>
      <div className={classes.order__info__flex}>
        <div>
          <div className={classes.order__info__container}>
            <span className={classes.order__info__span__big}>General</span>
            <span className={classes.order__info__span__small}>
              Status: {order.status}
            </span>
            <span className={classes.order__info__span__small}>
              Order made on:{" "}
              {new Date(order.timeStamp).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className={classes.order__info__span__small}>
              Order total: {order.total}$
            </span>
          </div>
          <div className={classes.order__info__container}>
            <span className={classes.order__info__span__big}>Address</span>
            <span className={classes.order__info__span__small}>
              Name: {order.address.name}
            </span>
            <span className={classes.order__info__span__small}>
              Email: {order.address.email}
            </span>
            <span className={classes.order__info__span__small}>
              Phone: {order.address.phone}
            </span>
            <span className={classes.order__info__span__small}>
              Street Name: {order.address.street}
            </span>
            <span className={classes.order__info__span__small}>
              Street Number: {order.address.streetNumber}
            </span>
            <span className={classes.order__info__span__small}>
              Delivery:{" "}
              {order.address.carrier === "deliveryStandard"
                ? "Standard (5$)"
                : "Express (10$)"}
            </span>
          </div>
        </div>
        <div>
          <span className={classes.order__info__span__big}>
            Product Quantities
          </span>
          <div className={classes.order__info__container__products}>
            {order.products.map((product) => {
              console.log(product);

              return (
                <div
                  className={classes.order__info__product}
                  key={product.productId._id}
                >
                  <div>
                    <span className={classes.order__info__product__name}>
                      {product.productId.name}
                    </span>
                    <span className={classes.order__info__product__quantity}>
                      Quantity: {product.productQuantity}
                    </span>
                  </div>
                  <span className={classes.order__info__product__price}>
                    {product.productId.price * product.productQuantity}$
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderInfo;

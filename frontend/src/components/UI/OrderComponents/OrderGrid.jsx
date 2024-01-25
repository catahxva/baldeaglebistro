import classes from "./OrderGrid.module.css";

import ProductCard from "../Others/ProductCard";

function OrderGrid({ products }) {
  console.log(products);

  return (
    <div className={classes.order__grid__container}>
      <h3 className={classes.order__grid__title}>Order Products</h3>
      <div className="general__grid">
        {products.map((product) => {
          return (
            <ProductCard
              product={product.productId}
              key={product.productId._id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default OrderGrid;

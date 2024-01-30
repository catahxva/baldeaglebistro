import classes from "./OrderGrid.module.css";

import ProductCard from "../Others/ProductCard";
import Placeholder from "../Others/Placeholder";

function OrderGrid({ products }) {
  const filteredProducts = products.filter(
    (product) => product.productId !== null
  );

  return (
    <div className={classes.order__grid__container}>
      <h3 className={classes.order__grid__title}>Order Products</h3>
      {filteredProducts.length > 0 && (
        <div className="general__grid">
          {products
            .filter((product) => product.productId !== null)
            .map((product) => {
              return (
                <ProductCard
                  product={product.productId}
                  key={product.productId._id}
                />
              );
            })}
        </div>
      )}
      {filteredProducts.length <= 0 && (
        <p>No products can be displayed at the moment.</p>
      )}
    </div>
  );
}

export default OrderGrid;

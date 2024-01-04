import classes from "./OverviewGrid.module.css";

import ProductCard from "../Others/ProductCard";

function OverviewGrid({ products }) {
  return (
    <div className="general__grid">
      {products.map((product) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </div>
  );
}

export default OverviewGrid;

import ProductInfo from "../UI/ProductComponents/ProductInfo";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <ProductInfo />
    </>
  );
}

export default Product;

import ProductInfo from "../UI/ProductComponents/ProductInfo";
import ProductRecommend from "../UI/ProductComponents/ProductRecommend";
import PopularProducts from "../UI/ProductComponents/PopularProducts";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchProduct } from "../../util/requests";

import Placeholder from "../UI/Others/Placeholder";

function Product() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: ({ signal }) => fetchProduct(signal, id),
  });

  let contentInfo;
  let contentRecommend;

  if (isPending) {
    contentInfo = <Placeholder type="loading" />;
    contentRecommend = <Placeholder type="loading" />;
  }

  if (isError) {
    contentInfo = <Placeholder type="error" message={error.message} />;
    contentRecommend = <Placeholder type="error" message={error.message} />;
  }

  if (data) {
    const product = data.data.data;

    contentInfo = <ProductInfo product={product} />;
    contentRecommend = <ProductRecommend category={product.category} />;
  }

  return (
    <>
      {contentInfo}
      {contentRecommend}
      <PopularProducts />
    </>
  );
}

export default Product;

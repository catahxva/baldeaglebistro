import classes from "./PopularProducts.module.css";

import { useQuery } from "@tanstack/react-query";

import { fetchProducts } from "../../../util/requests";

import ProductCard from "../Others/ProductCard";
import Placeholder from "../Others/Placeholder";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, A11y } from "swiper/modules";
import "swiper/css/bundle";

function PopularProducts() {
  const queryString = "?sort=popular";

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["popular"],
    queryFn: ({ signal }) => fetchProducts(signal, queryString),
  });

  let content;

  if (isPending) content = <Placeholder type="loading" />;

  if (isError) content = <Placeholder type="error" message={error.message} />;

  if (data) {
    const products = data.data.data;

    content = (
      <Swiper
        className={classes.popular__swiper}
        modules={[Navigation, Keyboard, A11y]}
        navigation
        keyboard
        slidesPerView={3}
      >
        {products.map((product) => {
          return (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} productType="slider" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  }

  return (
    <section>
      <h2>Most popular products</h2>
      {content}
    </section>
  );
}

export default PopularProducts;

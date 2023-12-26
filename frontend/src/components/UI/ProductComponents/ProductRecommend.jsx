import classes from "./ProductRecommend.module.css";

import { useQuery } from "@tanstack/react-query";

import { fetchProducts } from "../../../util/requests";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css/bundle";

import ProductCard from "../Others/ProductCard";
import Placeholder from "../Others/Placeholder";

const DATA = {
  "main dish": {
    title: "Main Dishes",
    description:
      " Immerse yourself in a culinary odyssey with our collection of extraordinary main dishes. Our chefs, inspired by both tradition and innovation, meticulously craft each dish to deliver an unparalleled dining experience. From succulent cuts of meat to expertly prepared seafood, our main dishes are a celebration of flavor, texture, and artistry. Every bite tells a story, inviting you to savor the journey of taste that unfolds with every carefully curated ingredient. Elevate your dining experience and embark on a gastronomic adventure with our main dishes—a symphony of culinary excellence. Unleash your senses and discover the nuances of each dish, as our main courses transport you to a realm where culinary artistry meets unparalleled indulgence.",
  },
  dessert: {
    title: "Desserts",
    description:
      "Conclude your culinary sojourn on a sweet note with our divine desserts. These indulgent creations are more than just confections; they are a celebration of sweetness in its purest form. From decadent chocolate delights to delicate pastries, each dessert is a work of art, meticulously crafted to captivate the senses. Our chefs, inspired by a passion for perfection, blend the finest ingredients to create a symphony of flavors that dance on your palate. Indulge in the sublime sweetness of our desserts and let the lingering taste of perfection be the grand finale to your dining experience. Succumb to the temptation of our dessert offerings, where each heavenly bite transports you to a realm of unparalleled sweetness and culinary bliss.",
  },
  side: {
    title: "Sides",
    description:
      " Transform your meal into a gastronomic masterpiece with our thoughtfully curated selection of sides. Crafted to complement and enhance the flavors of your main course, our sides are a testament to the art of culinary balance. From the crispiness of perfectly seasoned vegetables to the comfort of hearty grains, each side dish is a delightful exploration of taste and texture. Imbued with the same dedication to quality as our main dishes, our sides elevate your dining experience, turning each meal into a sensory delight that satisfies the palate and leaves a lasting impression. Embrace the symphony of flavors as our sides dance in harmony with your chosen main course, creating an unforgettable ensemble on your plate.",
  },
  beverage: {
    title: "Drinks",
    description:
      "Quench your thirst with a sip of perfection from our handpicked selection of beverages. From the effervescent sparkle of expertly crafted mocktails to the comforting warmth of classic favorites, each drink is a carefully chosen companion to your dining experience. Our beverage menu is a celebration of diversity, offering something for every palate and occasion. Savor the nuanced layers of flavor, and let our drinks elevate your meal, transforming it into a well-rounded symphony of taste and refreshment. Delight in the artistry of our mixologists as they craft each beverage with precision, ensuring that every sip is a refreshing revelation that enhances the overall symphony of flavors.",
  },
  appetizer: {
    title: "Appetizers",
    description:
      "Begin your culinary journey with a symphony of flavors as our appetizers set the stage for an unforgettable dining experience. These exquisite starters are more than just the opening act; they are a prelude to a gastronomic adventure. From the delicate interplay of textures to the bold explosion of flavors, each appetizer is a carefully choreographed dance on the taste buds. Designed to awaken your palate and stimulate the senses, our appetizers are a testament to the art of anticipation, ensuring that every bite leaves you eager for the culinary delights that follow. Let the anticipation build as you explore our diverse appetizer menu, each dish promising a tantalizing glimpse into the culinary wonders that await.",
  },
};

function ProductRecommend({ category }) {
  let queryStringOne;
  let queryStringTwo;
  let subTitleOne;
  let subTitleTwo;
  let descriptionOne;
  let descriptionTwo;

  if (category === "main dish") {
    queryStringOne = "?category=side&limit=3";
    queryStringTwo = "?category=dessert&limit=3";

    subTitleOne = DATA["side"].title;
    descriptionOne = DATA["side"].description;

    subTitleTwo = DATA["dessert"].title;
    descriptionTwo = DATA["dessert"].description;
  }
  if (category === "dessert") {
    queryStringOne = "?category=appetizer&limit=3";
    queryStringTwo = "?category=main dish&limit=3";

    subTitleOne = DATA["appetizer"].title;
    descriptionOne = DATA["appetizer"].description;

    subTitleTwo = DATA["main dish"].title;
    descriptionTwo = DATA["main dish"].description;
  }

  if (category === "side") {
    queryStringOne = "?category=main dish&limit=3";
    queryStringTwo = "?category=beverage&limit=3";

    subTitleOne = DATA["main dish"].title;
    descriptionOne = DATA["main dish"].description;

    subTitleTwo = DATA["beverage"].title;
    descriptionTwo = DATA["beverage"].description;
  }
  if (category === "beverage") {
    queryStringOne = "?category=appetizer&limit=3";
    queryStringTwo = "?category=side&limit=3";

    subTitleOne = DATA["appetizer"].title;
    descriptionOne = DATA["appetizer"].description;

    subTitleTwo = DATA["side"].title;
    descriptionTwo = DATA["side"].description;
  }
  if (category === "appetizer") {
    queryStringOne = "?category=beverage&limit=3";
    queryStringTwo = "?category=dessert&limit=3";

    subTitleOne = DATA["beverage"].title;
    descriptionOne = DATA["beverage"].description;

    subTitleTwo = DATA["dessert"].title;
    descriptionTwo = DATA["dessert"].description;
  }

  const {
    data: queryOne,
    isPending: isPendingQueryOne,
    isError: isErrorQueryOne,
    error: queryOneError,
  } = useQuery({
    queryKey: ["recommendation", { category, queryStringOne }],
    queryFn: ({ signal }) => fetchProducts(signal, queryStringOne),
  });

  const {
    data: queryTwo,
    isPending: isPendingQueryTwo,
    isError: isErrorQueryTwo,
    error: queryTwoError,
  } = useQuery({
    queryKey: ["recommendation", { category, queryStringTwo }],
    queryFn: ({ signal }) => fetchProducts(signal, queryStringTwo),
  });

  let content;

  if (isPendingQueryOne || isPendingQueryTwo)
    content = <Placeholder type="loading" />;

  if (isErrorQueryOne || isErrorQueryTwo)
    content = (
      <Placeholder
        type="error"
        message={
          isErrorQueryOne ? queryOneError.message : queryTwoError.message
        }
      />
    );

  if (queryOne && queryTwo) {
    const queryOneProducts = queryOne.data.data;
    const queryTwoProducts = queryTwo.data.data;

    content = (
      <>
        <div className={classes.product__recommend__grid}>
          <div>
            <h3 className={classes.product__recommend__title}>{subTitleOne}</h3>
            <p>{descriptionOne}</p>
          </div>
          <Swiper
            className={classes.product__recommend__swiper}
            modules={[Navigation, A11y]}
            navigation
            slidesPerView={1}
          >
            {queryOneProducts.map((product) => {
              return (
                <SwiperSlide key={product._id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className={classes.product__recommend__grid}>
          <div>
            <h3 className={classes.product__recommend__title}>{subTitleTwo}</h3>
            <p>{descriptionTwo}</p>
          </div>
          <Swiper
            className={classes.product__recommend__swiper}
            modules={[Navigation, A11y]}
            navigation
            slidesPerView={1}
          >
            {queryTwoProducts.map((product) => {
              return (
                <SwiperSlide key={product._id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </>
    );
  }

  return (
    <section>
      <h2>We got some recommendations...</h2>
      {content}
    </section>
  );
}

export default ProductRecommend;

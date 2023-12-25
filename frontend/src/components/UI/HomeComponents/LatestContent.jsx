import classes from "./LatestContent.module.css";

import Slider from "../Others/Slider";

const SELECTED_DATA = {
  appetizers: {
    title: "Appetizers",
    description:
      "Elevate your dining experience with our enticing selection of appetizers at the Bald Eagle Bistro. Crafted to tantalize your taste buds and spark your appetite, our appetizers range from crispy and shareable to elegantly plated small bites. Savor the anticipation as you explore a variety of flavors, textures, and culinary inspirations that set the stage for the culinary journey ahead. Whether you're indulging in a classic favorite or embracing a bold twist on tradition, our appetizers promise to awaken your palate and prepare you for a memorable dining adventure.",
  },
  main: {
    title: "Main Dishes",
    description:
      "Embark on a gastronomic voyage with our Main Dishes, where culinary excellence meets your expectations. From mouthwatering steaks and succulent seafood to delectable poultry and vegetarian delights, our main courses are a celebration of diverse tastes and culinary traditions. Each dish is meticulously crafted using the finest ingredients, expertly seasoned, and presented with artistic flair. Whether you crave a classic comfort food or desire an innovative culinary creation, our main dishes showcase the skillful balance of flavors, textures, and visual appeal that defines the Bald Eagle Bistro's commitment to exceptional dining.",
  },
  sides: {
    title: "Sides",
    description:
      "Complement your main course with our thoughtfully curated selection of sides, designed to enhance and complete your dining experience. From classic accompaniments to inventive twists on traditional favorites, our sides are the perfect partners to your main dish. Indulge in the rich and comforting flavors of perfectly seasoned vegetables, grains, and starches that not only satisfy your palate but also add a harmonious balance to every bite. At the Bald Eagle Bistro, our sides are more than accompaniments; they are culinary companions that contribute to the overall symphony of flavors, ensuring your dining adventure is nothing short of extraordinary.",
  },
};

function LatestContent({ enabledQuery, products }) {
  const { title, description } = SELECTED_DATA[enabledQuery];

  return (
    <div className={classes.latest__content}>
      <h3 className={classes.latest__content__title}>{title}</h3>
      <p>{description}</p>
      <Slider />
    </div>
  );
}

export default LatestContent;

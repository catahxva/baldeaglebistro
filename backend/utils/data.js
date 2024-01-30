const products = [
  {
    name: "Fried Pickles",
    price: 21,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703095782/cekspipwhtneek8kzbvc.jpg",
    serving: 320,
    category: "appetizer",
    nutrition: {
      calories: 248,
      protein: 2,
      carbs: 13,
      fats: 5,
    },
    description:
      "Elevate your snacking experience with our Fried Pickles—crisp dill pickle spears coated in a seasoned batter and deep-fried to a golden hue. Served with a zesty dipping sauce, these tangy delights are the perfect balance of crunch and flavor.",
    available: true,
  },
  {
    name: "Classic Deviled Eggs",
    price: 27,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703095829/vmzt8rhtixriok8o9irp.jpg",
    serving: 380,
    category: "appetizer",
    nutrition: {
      calories: 423,
      protein: 28,
      carbs: 18,
      fats: 8,
    },
    description:
      "Experience the timeless appeal of our Classic Deviled Eggs, where hard-boiled eggs are halved and filled with a velvety, seasoned yolk mixture. Garnished with a sprinkle of paprika, these appetizers are a nostalgic and savory start to any meal.",
    available: true,
  },
  {
    name: "Chili Cheese Fries",
    price: 35,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703095879/epnocshohaxhoq28h680.jpg",
    serving: 480,
    category: "appetizer",
    nutrition: {
      calories: 542,
      protein: 20,
      carbs: 56,
      fats: 34,
    },
    description:
      "Indulge in the ultimate comfort food with our Chili Cheese Fries—crispy fries smothered in savory chili and melted cheese. Each forkful delivers a satisfying combination of textures and bold flavors that will leave your taste buds craving more.",
    available: true,
  },
  {
    name: "Candied Bacon Cracker Bites",
    price: 38,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703095924/d7czsl8ecwtbshohieba.jpg",
    serving: 400,
    category: "appetizer",
    nutrition: {
      calories: 543,
      protein: 38,
      carbs: 23,
      fats: 30,
    },
    description:
      "Delight in the sweet and savory harmony of our Candied Bacon Cracker Bites. Crispy bacon strips are candied to perfection, then paired with buttery crackers for a delectable bite-sized treat that strikes the perfect balance between indulgence and sophistication.",
    available: true,
  },
  {
    name: "Crispy Garlic-Parmesan Wings",
    price: 42,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703095963/ts3wwmsyzomuco2vfnfl.jpg",
    serving: 300,
    category: "appetizer",
    nutrition: {
      calories: 612,
      protein: 39,
      carbs: 12,
      fats: 25,
    },
    description:
      "Tantalize your taste buds with our Crispy Garlic-Parmesan Wings, where succulent chicken wings are coated in a crispy garlic-parmesan crust. Each wing is a flavor explosion, combining the richness of parmesan with the aromatic allure of garlic for an unforgettable appetizer experience.",
    available: true,
  },
  {
    name: "Air Fryer Bloomin' Onion",
    price: 22,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703096008/lahvi4yyy0fuyokh3quq.jpg",
    serving: 312,
    category: "appetizer",
    nutrition: {
      calories: 388,
      protein: 5,
      carbs: 23,
      fats: 18,
    },
    description:
      "Embark on a culinary adventure with our Air Fryer Bloomin' Onion Recipe. Sliced onions are seasoned, coated, and air-fried to create a blooming masterpiece. Served with a tangy dipping sauce, this appetizer is a delightful twist on a classic favorite, minus the deep-frying guilt.",
    available: true,
  },
  {
    name: "Appalachian Apple Stack Cake",
    price: 36,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703096048/esrasxtxxpm4bc3gsbfg.jpg",
    serving: 250,
    category: "dessert",
    nutrition: {
      calories: 456,
      protein: 1,
      carbs: 45,
      fats: 34,
    },
    description:
      "Immerse yourself in the rich tradition of the Appalachian Apple Stack Cake. Layer upon layer of spiced apple filling is nestled between thin, molasses-infused cake rounds. The result is a nostalgic and heartwarming dessert that pays homage to the culinary heritage of the Appalachian region.",
    available: true,
  },
  {
    name: "Fresh Peach Crumble",
    price: 24,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703096094/ju881189av7loh3tpucw.jpg",
    serving: 180,
    category: "dessert",
    nutrition: {
      calories: 234,
      protein: 2,
      carbs: 28,
      fats: 17,
    },
    description:
      "Indulge in the essence of summer with our Fresh Peach Crumble. Juicy, ripe peaches are bathed in cinnamon and sugar, then crowned with a buttery crumbly topping. Served warm and paired with a scoop of vanilla ice cream, this dessert is a celebration of seasonal sweetness.",
    available: true,
  },
  {
    name: "Blackberry Cobbler",
    price: 31,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703096134/qm4gev9lfy3eadc290u8.jpg",
    serving: 312,
    category: "dessert",
    nutrition: {
      calories: 345,
      protein: 4,
      carbs: 56,
      fats: 30,
    },
    description:
      "Delight in the rustic charm of our Blackberry Cobbler, where plump blackberries bubble beneath a golden lattice crust. The perfect marriage of tart and sweet, this timeless dessert captures the essence of home-baked goodness with each spoonful.",
    available: true,
  },
  {
    name: "Fresh Strawberry Pie",
    price: 23,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703096169/ufy8qyqcqzgtl5b4zaaj.jpg",
    serving: 310,
    category: "dessert",
    nutrition: {
      calories: 512,
      protein: 8,
      carbs: 38,
      fats: 25,
    },
    description:
      "Experience the vibrant flavors of the season with our Fresh Strawberry Pie. Succulent strawberries, bathed in a glossy glaze, rest atop a buttery pie crust. Each slice is a symphony of textures and tastes, offering a burst of freshness in every bite.",
    available: true,
  },
  {
    name: "Butterscotch Cookies",
    price: 16,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703096201/zb0i4rrrbitfqpxupn1z.jpg",
    serving: 286,
    category: "dessert",
    nutrition: {
      calories: 314,
      protein: 5,
      carbs: 52,
      fats: 21,
    },
    description:
      "Succumb to the allure of our Butterscotch Cookies—soft, chewy delights infused with the rich, buttery goodness of butterscotch. Baked to perfection, these cookies strike a perfect balance between sweet and savory, making them an irresistible treat for any dessert enthusiast.",
    available: true,
  },
  {
    name: "Whiskey Cake With Brown Butter Whiskey Glaze",
    price: 43,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703096241/ltwh81hgjd2yso4h4srb.jpg",
    serving: 560,
    category: "dessert",
    nutrition: {
      calories: 1028,
      protein: 11,
      carbs: 67,
      fats: 32,
    },
    description:
      "Embark on a journey of indulgence with our Whiskey Cake adorned in a decadent Brown Butter Whiskey Glaze. Each moist and flavorful slice is infused with the nuanced notes of whiskey, creating a harmonious symphony of richness. A dessert that invites you to savor every luxurious moment.",
    available: true,
  },
  {
    name: "Lava Flow Hawaiian Tropical Drink",
    price: 11,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703096283/uvkzow5cx5dzmemyqmoc.jpg",
    serving: 200,
    category: "beverage",
    nutrition: {
      calories: 245,
      protein: 0,
      carbs: 15,
      fats: 5,
    },
    description:
      "Transport yourself to a tropical paradise with our Lava Flow Hawaiian Tropical Drink. A mesmerizing blend of coconut cream, fresh pineapple juice, and ripe strawberries creates vibrant layers reminiscent of flowing lava. Served over ice, this refreshing beverage is a taste of the exotic islands in every sip.",
    available: true,
  },
  {
    name: "Lime Cola",
    price: 8,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703096371/lxce9i9mkxsbverajzft.jpg",
    serving: 300,
    category: "beverage",
    nutrition: {
      calories: 189,
      protein: 0,
      carbs: 29,
      fats: 6,
    },
    description:
      "Quench your thirst with the zesty twist of our Lime Cola. Classic cola meets the bright and tangy essence of freshly squeezed limes, creating a revitalizing beverage that strikes the perfect balance between sweetness and citrusy refreshment. An effervescent delight for lime lovers.",
    available: true,
  },
  {
    name: "Sweet Sunrise Drink",
    price: 19,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703096406/rlrwyyvn1q6shjv0mfvj.jpg",
    serving: 290,
    category: "beverage",
    nutrition: {
      calories: 312,
      protein: 0,
      carbs: 22,
      fats: 12,
    },
    description:
      "Embrace the beauty of a new day with our Sweet Sunrise Drink. A medley of tropical fruits, including orange and pineapple, creates a colorful sunrise-inspired blend. Garnished with a slice of citrus and served in a chilled glass, this beverage is a sweet and uplifting way to start any meal.",
    available: true,
  },
  {
    name: "Death by Chocolate Cocktail",
    price: 25,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703096455/ansnyec6dfuxiilhboio.jpg",
    serving: 350,
    category: "beverage",
    nutrition: {
      calories: 734,
      protein: 8,
      carbs: 75,
      fats: 40,
    },
    description:
      "Indulge in the decadence of our Death by Chocolate Cocktail, a sinfully rich concoction for chocolate enthusiasts. A blend of premium dark chocolate liqueur, creamy Irish cream, and a hint of coffee liqueur creates a luxurious, dessert-like drink. Sipped slowly, this cocktail is a heavenly treat for those with a sweet tooth and a passion for all things chocolate.",
    available: true,
  },
  {
    name: "Cajun-Style Corn on the Cob",
    price: 15,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703096496/aldvpfbfmorhxptkuy2w.jpg",
    serving: 300,
    category: "side",
    nutrition: {
      calories: 278,
      protein: 6,
      carbs: 31,
      fats: 12,
    },
    description:
      "Immerse your taste buds in a burst of flavors with our Cajun-Style Corn on the Cob. Each succulent ear is grilled to perfection and generously coated with a zesty Cajun spice blend, creating a harmonious marriage of smokiness and heat that will transport you straight to the heart of Louisiana.",
    available: true,
  },
  {
    name: "Southern Fried Green Tomatoes",
    price: 24,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703096534/znkhh6tyh7mldpdrihna.jpg",
    serving: 254,
    category: "side",
    nutrition: {
      calories: 189,
      protein: 3,
      carbs: 24,
      fats: 8,
    },
    description:
      "Our Southern Fried Green Tomatoes are a delightful twist on a Southern classic. Sliced green tomatoes are delicately coated in a crispy cornmeal crust, then fried to a golden perfection. The result is a tantalizing dish with a crunchy exterior that gives way to the tangy and slightly tart goodness of the green tomatoes inside.",
    available: true,
  },
  {
    name: "Butternut Squash Latkes With Caramelized Fennel Jam",
    price: 32,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703096577/ygvdw2vmzuuzp8wwnemt.jpg",
    serving: 456,
    category: "side",
    nutrition: {
      calories: 568,
      protein: 19,
      carbs: 39,
      fats: 32,
    },
    description:
      "Elevate your palate with our Butternut Squash Latkes paired with Caramelized Fennel Jam. These golden, crispy latkes are crafted from a blend of grated butternut squash and potatoes, creating a delightful medley of sweetness and earthiness. The dish is then crowned with a luscious caramelized fennel jam, adding a touch of sophistication to this classic comfort food.",
    available: true,
  },
  {
    name: "Air Fryer French Fries",
    price: 13,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703096647/zyy6ryboywhcvrgvhfje.jpg",
    serving: 500,
    category: "side",
    nutrition: {
      calories: 623,
      protein: 3,
      carbs: 43,
      fats: 28,
    },
    description:
      "Savor the guilt-free indulgence of our Air Fryer French Fries, where crispy perfection meets a lighter alternative. These golden fries are air-fried to a delightful crispiness, preserving that beloved potato flavor while minimizing the oil content. A side that satisfies your cravings without compromising on taste.",
    available: true,
  },
  {
    name: "Air Fryer Onion Rings",
    price: 22,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703096699/qekmjnsegdhftdph5djb.jpg",
    serving: 395,
    category: "side",
    nutrition: {
      calories: 233,
      protein: 2,
      carbs: 26,
      fats: 12,
    },
    description:
      "Experience the ultimate crunch with our Air Fryer Onion Rings. Each ring boasts a golden, crispy coating achieved through the magic of air frying, revealing the sweet and savory essence of the onion inside. A guilt-free, flavorful indulgence that will have you reaching for more.",
    available: true,
  },
  {
    name: "Crispy Fried Mushroom Burger",
    price: 18,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703094823/nuqcla6oedqpeqfm281r.jpg",
    serving: 342,
    category: "main dish",
    nutrition: {
      calories: 668,
      protein: 45,
      carbs: 52,
      fats: 30,
    },
    description:
      "Indulge in the rich umami flavors of our Crispy Mushroom Burger, where savory mushrooms are expertly seasoned and crisped to perfection. Nestled within a soft bun, this burger offers a delightful combination of textures and earthy notes.",
    available: true,
  },
  {
    name: "Million Dollar Chicken Casserole",
    price: 35,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703094891/inreoed8twufooq2llkn.jpg",
    serving: 500,
    category: "main dish",
    nutrition: {
      calories: 890,
      protein: 52,
      carbs: 67,
      fats: 34,
    },
    description:
      "Elevate your dining experience with our Million Dollar Chicken Casserole. Succulent chicken pieces are bathed in a luxurious creamy sauce, topped with a golden layer of cheese and crispy breadcrumbs. A comforting and decadent dish that lives up to its name.",
    available: true,
  },
  {
    name: "Cast Iron Steak",
    price: 42,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703094941/ltqjeuhhdtcuwzwf1i09.jpg",
    serving: 320,
    category: "main dish",
    nutrition: {
      calories: 389,
      protein: 52,
      carbs: 12,
      fats: 31,
    },
    description:
      "Savor the bold and robust taste of our Cast Iron Steak. Cooked to your preference, this premium cut is seared in a cast iron pan to lock in juices and create a mouthwatering crust. Each bite delivers a perfect balance of tenderness and flavor.",
    available: true,
  },
  {
    name: "BBQ Country Style Ribs",
    price: 48,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703095074/hv0e33mwujooxmu6kklc.jpg",
    serving: 600,
    category: "main dish",
    nutrition: {
      calories: 1278,
      protein: 72,
      carbs: 30,
      fats: 54,
    },
    description:
      "Dive into a feast of BBQ Country Style Ribs, where tender pork ribs are slow-cooked to perfection and generously glazed with our signature barbecue sauce. The result is a harmonious blend of smoky, sweet, and savory flavors that will leave your taste buds dancing.",
    available: true,
  },
  {
    name: "Instant Pot Pulled Pork",
    price: 34,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703095353/vys3f0khnr347twvxz1l.avif",
    serving: 415,
    category: "main dish",
    nutrition: {
      calories: 845,
      protein: 65,
      carbs: 37,
      fats: 26,
    },
    description:
      "Experience the convenience and flavor explosion of our Instant Pot Pulled Pork. Slow-cooked for hours, the succulent pork is expertly shredded and infused with a smoky barbecue essence. Perfectly tender, this dish is a go-to for those who appreciate quick yet delicious meals.",
    available: true,
  },
  {
    name: "Philly Cheesesteak",
    price: 29,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703095441/adfacoy23zbwfuzkks5j.jpg",
    serving: 430,
    category: "main dish",
    nutrition: {
      calories: 678,
      protein: 48,
      carbs: 30,
      fats: 29,
    },
    description:
      "Transport your taste buds to Philadelphia with our iconic Philly Cheesesteak. Thinly sliced beefsteak meets sautéed onions and melted cheese, all nestled in a soft roll. A classic combination that captures the essence of this beloved sandwich.",
    available: true,
  },
  {
    name: "Louisiana Creole Gumbo",
    price: 72,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703095481/gyhv6qzcvj38bofc3zjc.jpg",
    serving: 540,
    category: "main dish",
    nutrition: {
      calories: 890,
      protein: 67,
      carbs: 34,
      fats: 39,
    },
    description:
      "Take a culinary journey to the heart of Louisiana with our Creole Gumbo. A soul-warming stew featuring a medley of seafood or meats, aromatic spices, and the holy trinity of Cajun cuisine—bell peppers, onions, and celery. A true taste of the Bayou.",
    available: true,
  },
  {
    name: "Juicy Beef and Bacon Burgers",
    price: 89,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703095538/g9za4umaansl8icgcbsm.jpg",
    serving: 700,
    category: "main dish",
    nutrition: {
      calories: 1344,
      protein: 89,
      carbs: 45,
      fats: 62,
    },
    description:
      "Sink your teeth into our Juicy Beef and Bacon Burgers, where premium ground beef meets crispy bacon to create a flavor-packed patty. Grilled to perfection, these burgers are a carnivore's delight, offering a burst of smoky and savory goodness in every bite.",
    available: true,
  },
  {
    name: "Pastrami Burgers",
    price: 79,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703095601/pkugvpwkmrprchq1gopx.webp",
    serving: 650,
    category: "main dish",
    nutrition: {
      calories: 934,
      protein: 55,
      carbs: 43,
      fats: 49,
    },
    description:
      "Experience a twist on the classic burger with our Pastrami Burgers. Succulent ground beef is complemented by layers of thinly sliced pastrami, creating a delightful combination of textures and flavors. A hearty choice for those craving a unique and satisfying meal.",
    available: true,
  },
  {
    name: "Grilled Beef and Turkey Burgers With Basil",
    price: 56,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703095642/srdv86v7exx5whvksjil.jpg",
    serving: 678,
    category: "main dish",
    nutrition: {
      calories: 1400,
      protein: 90,
      carbs: 34,
      fats: 29,
    },
    description:
      "Delight in the freshness of our Grilled Beef and Turkey Burgers infused with aromatic basil. The lean turkey complements the richness of the beef, while the herbal notes add a refreshing twist. A healthier option without compromising on flavor.",
    available: true,
  },
  {
    name: "Air Fryer Mac and Cheese Balls",
    price: 18,
    image:
      "https://res.cloudinary.com/dgwygf5i3/image/upload/v1703095691/lonnm4tkpjdj5zyvqnhi.jpg",
    serving: 285,
    category: "appetizer",
    nutrition: {
      calories: 367,
      protein: 20,
      carbs: 19,
      fats: 34,
    },
    description:
      "Bite into the golden perfection of our Air Fryer Mac and Cheese Balls, where creamy macaroni and cheese is molded into bite-sized orbs and air-fried to a crispy exterior. The result is a delightful blend of cheesy goodness encased in a crunchy shell.",
    available: true,
  },
];

module.exports = products;

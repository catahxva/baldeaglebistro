const mongoose = require("mongoose");
const dotenv = require("dotenv");
const data = require("./utils/data");
const Product = require("./models/productModel");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE_NAME.replace(
  "<password>",
  process.env.DATABASE_PASS
);

const connectToDB = async function () {
  await mongoose.connect(DB);

  console.log("DB Connection Successful");
};

connectToDB();

const isPalindrome = function (string) {
  const arrString = string.split("");

  const reversedArray = [...arrString].reverse();

  const reduceNumber = arrString.reduce((acc, el, i) => {
    if (el === reversedArray[i]) acc++;

    return acc;
  }, 0);

  if (reduceNumber === arrString.length) return true;
  else return false;
};

console.log(isPalindrome("level"));

// const insertData = function () {
//   data.forEach(async (product, i) => {
//     const newProduct = await Product.create(product);

//     console.log("SUCCESS", i);
//   });
// };

// insertData();

const port = 3000;

app.listen(port, () => {
  console.log(`App running on ${port}`);
});

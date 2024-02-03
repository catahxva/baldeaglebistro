const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Order = require("./models/orderModel");

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

const port = 443;

app.listen(port, () => {
  console.log(`App running on ${port}`);
});

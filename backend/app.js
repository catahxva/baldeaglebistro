const express = require("express");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const app = express();

const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const ordersRouter = require("./routes/orderRoutes");
const ratingsRouter = require("./routes/ratingsRoutes");

app.use(helmet());
app.use(
  "/",
  rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests, please try again later.",
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());
app.use(xss());

app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,authorization"
  );
  res.status(200).send();
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,authorization"
  );
  next();
});

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/ratings", ratingsRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

module.exports = app;

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();
const productRoute = require("./routes/products");
const authRoute = require("./routes/auth");
const paymentRoute = require("./routes/payment");
const orderRoute = require("./routes/orders");
const userRoute = require("./routes/user");
const cartRoute = require("./routes/cart");

const port = 3000;

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(
  cors({
    origin: "exp://192.168.1.32:8081", // Update with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);
app.use("/api/", authRoute);
app.use("/api/products", productRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/orders", orderRoute);
app.use("/api/users", userRoute);
app.use("/api/carts", cartRoute);

app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

// app.get("/products/:id", function (req, res, next) {
//   res.json({ msg: "This is CORS-enabled for all origins!" });
// });

// app.listen(port, function () {
//   console.log(`CORS-enabled web server listening on port ${port}`);
// });

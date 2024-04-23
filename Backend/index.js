const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();
const productRouter = require("./routes/products");
const port = 3000;
app.use(cors());

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/products", productRouter);
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

app.get("/products/:id", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

// app.listen(port, function () {
//   console.log(`CORS-enabled web server listening on port ${port}`);
// });

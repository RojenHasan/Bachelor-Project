const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const productRoute = require("./routes/products");
const authRoute = require("./routes/auth");
const paymentRoute = require("./routes/payment");
const orderRoute = require("./routes/orders");
const userRoute = require("./routes/user");
const cartRoute = require("./routes/cart");
const messageRoute = require("./routes/message");

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

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
    origin: "exp://192.168.1.32:8082",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/api/", authRoute);
app.use("/api/products", productRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/orders", orderRoute);
app.use("/api/users", userRoute);
app.use("/api/carts", cartRoute);
app.use("/api/messages", messageRoute);


app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

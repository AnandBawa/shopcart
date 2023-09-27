import "express-async-errors";
import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";

//routers
import productRouter from "./routes/productRouter.js";

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

dotenv.config();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.post("/", (req, res) => {
  res.send({ message: "Data received", data: req.body });
});

app.use("/api/v1/products", productRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not found" });
});

app.use(errorHandlerMiddleware);

// database connection
const port = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.MONGO_DB_URL);
  app.listen(port, () => {
    console.log(`Server listening on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

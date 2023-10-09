import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";

dotenv.config();

try {
  await mongoose.connect(process.env.MONGO_DB_URL);
  const user = await User.findOne({ email: "anand@gmail.com" });
  const jsonProducts = JSON.parse(
    await readFile(new URL("./newData.json", import.meta.url))
  );
  const products = jsonProducts.map((product) => {
    return { ...product, addedBy: user._id };
  });
  await Product.deleteMany({});
  await Product.create(products);
  console.log("Success...");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}

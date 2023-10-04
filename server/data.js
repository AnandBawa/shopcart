import { readFile } from "fs/promises";
import fs from "fs";

// const products = JSON.parse(
//   await readFile(new URL("./combo.json", import.meta.url))
// );

// const jsonObj = products.filter((product) => product.price !== null);

// const jsonContent = JSON.stringify(jsonObj);

// fs.writeFile("output.json", jsonContent, "utf8", function (err) {
//   if (err) {
//     console.log("An error occurred while writing JSON Object to File.");
//     return console.log(err);
//   }
//   console.log("JSON file has been saved.");
// });

// import { wirelessNetworkAdapters } from "./utils/imageLinks.js";

const products = JSON.parse(
  await readFile(new URL("./data.json", import.meta.url))
);

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const updatedProducts = products.map((product) => {
  let origPrice =
    Math.ceil(product.price + (randomNumber(5, 25) * product.price) / 100) -
    0.01;
  product.origPrice = origPrice;
  return product;
});

const jsonContent = JSON.stringify(updatedProducts);

fs.writeFile("newData.json", jsonContent, "utf8", function (err) {
  if (err) {
    console.log("An error occurred while writing JSON Object to File.");
    return console.log(err);
  }
  console.log("JSON file has been saved.");
});

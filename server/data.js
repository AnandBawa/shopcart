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

import { cases } from "./utils/imageLinks.js";

const products = JSON.parse(
  await readFile(new URL("./newData.json", import.meta.url))
);

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const updatedProducts = products.map((product) => {
  if (product.subcategory === "Cases") {
    product.images = [];
    let random = randomNumber(0,4)
    product.images.push(cases[random]);
  }
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

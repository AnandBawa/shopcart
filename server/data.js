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

const products = JSON.parse(
  await readFile(new URL("./newOutput.json", import.meta.url))
);

import { wirelessNetworkAdapters } from "./utils/imageLinks.js";

const updatedProducts = products.map((product) => {
  if (product.images === undefined) product.images= [];
  if (product.subcategory === "Wireless Network Adapters") {
    const random = Math.floor(Math.random() * wirelessNetworkAdapters.length);
    product.images.push(wirelessNetworkAdapters[random]);
  }
  return product;
});

const jsonContent = JSON.stringify(updatedProducts);

fs.writeFile("newOutput.json", jsonContent, "utf8", function (err) {
  if (err) {
    console.log("An error occurred while writing JSON Object to File.");
    return console.log(err);
  }
  console.log("JSON file has been saved.");
});

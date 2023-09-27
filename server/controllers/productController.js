import { StatusCodes } from "http-status-codes";
import Product from "../models/productModel.js";
import { NotFoundError } from "../errors/customErrors.js";

//Get all products
export const getAllProducts = async (req, res) => {
  const products = await Product.find({}).limit(100);
  res.status(StatusCodes.OK).json({ products });
};

//Create a new product
export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

//Get a single product
export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    throw new NotFoundError(`No product found with id ${id}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

//Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedProduct) {
    throw new NotFoundError(`No product found with id ${id}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Product edited", job: updatedProduct });
};

//Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const removedProduct = await Product.findByIdAndDelete(id);

  if (!removedProduct) {
    throw new NotFoundError(`No product found with id ${id}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Product deleted", job: removedProduct });
};

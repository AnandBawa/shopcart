import { StatusCodes } from "http-status-codes";
import Product from "../models/productModel.js";

// Get all products
export const getAllProducts = async (req, res) => {
  const products = await Product.find({}).limit(12);
  res.status(StatusCodes.OK).json({ products });
};

// Create a new product
export const createProduct = async (req, res) => {
  req.body.addedBy = req.user._id;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

// Get a single product
export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(StatusCodes.OK).json({ product });
};

// Update a product
export const updateProduct = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: "Product edited", job: updatedProduct });
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const removedProduct = await Product.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ msg: "Product deleted", job: removedProduct });
};

// Get products with highest discount in each subcategory
export const maxDiscountInCategory = async (req, res) => {
  const result = await Product.aggregate([
    {
      $group: {
        _id: {
          subcategory: "$subcategory",
        },
        maxDiscount: {
          $max: "$discount",
        },
        products: {
          $push: "$$ROOT",
        },
      },
    },
    {
      $project: {
        _id: 0,
        subcategory: "$_id.subcategory",
        maxDiscount: 1,
        products: {
          $filter: {
            input: "$products",
            as: "product",
            cond: {
              $eq: ["$maxDiscount", "$$product.discount"],
            },
          },
        },
      },
    },
  ]);

  const products = result.map((product) => product.products[0]);

  res.status(StatusCodes.OK).json({ products: products });
};

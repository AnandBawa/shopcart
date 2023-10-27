import { StatusCodes } from "http-status-codes";
import Product from "../models/productModel.js";
import orderModel from "../models/orderModel.js";
import mongoose from "mongoose";

// Get all products
export const getAllProducts = async (req, res) => {
  const {
    search,
    category,
    subcategory,
    minPrice,
    maxPrice,
    sort,
    pageNo,
    viewCount,
  } = req.query;

  const query = {};

  if (search) query.name = { $regex: search, $options: "i" };
  if (category && category !== "All") query.category = category;
  if (subcategory && subcategory !== "All") query.subcategory = subcategory;

  if (minPrice || maxPrice) {
    query.price = {
      $lte: maxPrice || Number.MAX_SAFE_INTEGER,
      $gte: minPrice || 0,
    };
  }

  const sortBy = {
    New: "-createdAt",
    "A - Z": "name",
    "Z - A": "-name",
    "Price Low": "price",
    "Price High": "-price",
    "Discount Low": "discount",
    "Discount High": "-discount",
  };
  const sortValue = sortBy[sort] || sortBy.New;

  const page = Number(pageNo) || 1;
  const limit = Number(viewCount) || 12;
  const skip = (page - 1) * limit;

  const products = await Product.find(query)
    .sort(sortValue)
    .skip(skip)
    .limit(limit);

  const totalProducts = await Product.countDocuments(query);
  const numPages = Math.ceil(totalProducts / limit);

  res.status(StatusCodes.OK).json({
    totalProducts,
    numPages,
    currentPage: page,
    products,
  });
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
  if (product.reviews) {
    await product.populate({
      path: "reviews",
      populate: { path: "author", select: "firstName" },
    });
  }
  let hasOrdered = null;
  if (req.user) {
    const filter = {
      "cart.items.product._id": req.params.id,
      user: req.user._id,
    };
    hasOrdered = await orderModel.findOne(filter);
  }
  res.status(StatusCodes.OK).json({ product, hasOrdered });
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
  products.sort((a, b) => b.discount - a.discount);

  res.status(StatusCodes.OK).json({ products: products });
};

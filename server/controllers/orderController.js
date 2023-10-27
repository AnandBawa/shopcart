import { StatusCodes } from "http-status-codes";
import Order from "../models/orderModel.js";

// Get all orders for current logged-in user
export const getAllOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.status(StatusCodes.OK).json({ orders });
};

// Create a new order
export const createOrder = async (req, res) => {
  req.body.user = req.user._id;

  const order = await Order.create(req.body);

  res.status(StatusCodes.CREATED).json({ order });
};

// Get details of an order
export const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  res.status(StatusCodes.OK).json({ order });
};

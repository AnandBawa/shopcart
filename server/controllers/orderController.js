import { StatusCodes } from "http-status-codes";
import Order from "../models/orderModel.js";

export const getAllOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(StatusCodes.OK).json({ orders });
};

export const createOrder = async (req, res) => {
  console.log(req.body);
  req.body.user = req.user._id;
  const order = await Order.create(req.body);
  res.status(StatusCodes.CREATED).json({ order });
};

export const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.status(StatusCodes.OK).json({ order });
};

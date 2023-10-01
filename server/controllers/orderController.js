import { StatusCodes } from "http-status-codes";
import Order from "../models/orderModel.js";

export const getAllOrders = async (req, res) => {};

export const createOrder = async (req, res) => {
  req.body.user = req.user._id;
  const order = await Order.create(req.body);
  res.status(StatusCodes.CREATED).json({ order });
};

export const getSingleOrder = async (req, res) => {};

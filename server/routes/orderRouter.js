import { Router } from "express";
import {
  getAllOrders,
  createOrder,
  getSingleOrder,
} from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.route("/").get(getAllOrders).post(createOrder);

orderRouter.route("/:id").get(getSingleOrder);

export default orderRouter;

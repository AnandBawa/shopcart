import { Router } from "express";
import {
  getAllOrders,
  createOrder,
  getOrder,
} from "../controllers/orderController.js";
import { validateOrderId } from "../middleware/validationMiddleware.js";

const orderRouter = Router();

orderRouter.route("/").get(getAllOrders).post(createOrder);

orderRouter.route("/:id").get(validateOrderId, getOrder);

export default orderRouter;

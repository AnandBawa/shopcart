import { Router } from "express";
import { validateProductInput } from "../middleware/validationMiddleware.js";

const productRouter = Router();

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} from "../controllers/productController.js";

productRouter
  .route("/")
  .get(getAllProducts)
  .post(validateProductInput, createProduct);
productRouter
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default productRouter;

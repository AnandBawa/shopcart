import { Router } from "express";
import {
  validateProductInput,
  validateProductId,
} from "../middleware/validationMiddleware.js";
import { isAdmin, isLoggedIn } from "../middleware/authMiddleware.js";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} from "../controllers/productController.js";

const productRouter = Router();

productRouter
  .route("/")
  .get(getAllProducts)
  .post(isLoggedIn, isAdmin, validateProductInput, createProduct);

productRouter
  .route("/:id")
  .get(validateProductId, getProduct)
  .patch(
    isLoggedIn,
    isAdmin,
    validateProductId,
    validateProductInput,
    updateProduct
  )
  .delete(isLoggedIn, isAdmin, validateProductId, deleteProduct);

export default productRouter;

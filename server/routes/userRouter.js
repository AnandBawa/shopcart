import { Router } from "express";
import {
  getCurrentUser,
  updateUser,
  addAddress,
  updateAddress,
  deleteAddress,
  addPayment,
  updatePayment,
  deletePayment,
} from "../controllers/userController.js";
import {
  validateUpdateUserInput,
  validateAddressInput,
  validatePaymentInput,
} from "../middleware/validationMiddleware.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.route("/current-user").get(getCurrentUser);

userRouter
  .route("/update-user")
  .patch(isLoggedIn, validateUpdateUserInput, updateUser);

userRouter
  .route("/address-book")
  .post(isLoggedIn, validateAddressInput, addAddress);

userRouter
  .route("/address-book/:id")
  .patch(isLoggedIn, validateAddressInput, updateAddress)
  .delete(isLoggedIn, deleteAddress);

userRouter
  .route("/payment-method")
  .post(isLoggedIn, validatePaymentInput, addPayment);

userRouter
  .route("/payment-method/:id")
  .patch(isLoggedIn, validatePaymentInput, updatePayment)
  .delete(isLoggedIn, deletePayment);

export default userRouter;

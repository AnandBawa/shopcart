import { Router } from "express";
import {
  getCurrentUser,
  updateUser,
  getAllAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/userController.js";
import {
  validateUpdateUserInput,
  validateAddressInput,
} from "../middleware/validationMiddleware.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.route("/current-user").get(getCurrentUser);

userRouter
  .route("/update-user")
  .patch(isLoggedIn, validateUpdateUserInput, updateUser);

userRouter
  .route("/address-book")
  .get(isLoggedIn, getAllAddresses)
  .post(isLoggedIn, validateAddressInput, addAddress);

userRouter
  .route("/address-book/:id")
  .patch(isLoggedIn, validateAddressInput, updateAddress)
  .delete(isLoggedIn, deleteAddress);

export default userRouter;

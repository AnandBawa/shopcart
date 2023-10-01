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

const userRouter = Router();

userRouter.route("/current-user").get(getCurrentUser);

userRouter.route("/update-user").patch(validateUpdateUserInput, updateUser);

userRouter
  .route("/address-book")
  .get(getAllAddresses)
  .post(validateAddressInput, addAddress);

userRouter
  .route("/address-book/:id")
  .patch(validateAddressInput, updateAddress)
  .delete(deleteAddress);

export default userRouter;

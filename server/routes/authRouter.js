import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";
import { validateRegisterInput } from "../middleware/validationMiddleware.js";
import { authenticateLocal } from "../utils/passportConfig.js";

const authRouter = Router();

// Register
authRouter.route("/register").post(validateRegisterInput, register);

// Login
authRouter.route("/login").post(authenticateLocal, login);

// Logout
authRouter.route("/logout").get(logout);

export default authRouter;

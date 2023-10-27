import { Router } from "express";
import rateLimiter from "express-rate-limit";
import { register, login, logout } from "../controllers/authController.js";
import { validateRegisterInput } from "../middleware/validationMiddleware.js";
import { authenticateLocal } from "../utils/passportConfig.js";

const authRouter = Router();

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 25,
  message: { msg: "IP rate limit exceeded. Retry in 15 minutes" },
});

// Register
authRouter.route("/register").post(apiLimiter, validateRegisterInput, register);

// Login
authRouter.route("/login").post(apiLimiter, authenticateLocal, login);

// Logout
authRouter.route("/logout").post(logout);

export default authRouter;

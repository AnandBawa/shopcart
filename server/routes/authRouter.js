import { Router } from "express";
import passport from "passport";
import rateLimiter from "express-rate-limit";
import { register, login, logout } from "../controllers/authController.js";
import { validateRegisterInput } from "../middleware/validationMiddleware.js";
import { authenticateLocal } from "../utils/passportConfig.js";

const authRouter = Router();

// Rate limit routes to prevent abuse
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 25,
  message: { msg: "IP rate limit exceeded. Retry in 15 minutes" },
  validate: { xForwardedForHeader: false },
});

// Register
authRouter.route("/register").post(apiLimiter, validateRegisterInput, register);

// Login
authRouter.route("/login").post(apiLimiter, authenticateLocal, login);

authRouter
  .route("/github")
  .get(passport.authenticate("github", { scope: ["user:email"] }));

authRouter
  .route("/github/callback")
  .get(passport.authenticate("github"), (req, res) =>
    res.redirect("https://shopcart-2hr3.onrender.com/")
  );

// Logout
authRouter.route("/logout").post(logout);

export default authRouter;

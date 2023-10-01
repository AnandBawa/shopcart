import passport from "passport";
import User from "../models/userModel.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { comparePassword } from "./passwordUtils.js";

export const localAuthStrategy = async (phone, password, done) => {
  try {
    const user = await User.findOne({
      $or: [{ email: phone }, { phone: phone }],
    });
    if (!user) {
      return done(null, false, {
        error: `No user found with id: ${phone}`,
      });
    }
    const isMatch = await comparePassword(user.password, password);
    if (!isMatch) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

export const authenticateLocal = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) throw new UnauthenticatedError("Invalid credentials");
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      next();
    });
  })(req, res, next);
};

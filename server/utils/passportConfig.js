import passport from "passport";
import User from "../models/userModel.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { comparePassword } from "./passwordUtils.js";

// Create Passport-Local strategy
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

// Function to authenticate login
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

// Create Passport-Github strategy
export const githubAuthStrategy = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  const { id, displayName } = profile;
  const { phone, email, avatar_url } = profile._json;
  const firstName = displayName.trim().split(" ").at(0);
  const lastName = displayName.trim().split(" ").at(-1);
  try {
    let user = await User.findOne({
      $or: [{ email: phone }, { phone: phone }, { githubID: id }],
    });
    if (!user) {
      const newUser = await User.create({
        email: email,
        phone: phone,
        githubId: id,
        image: { url: avatar_url },
        firstName: firstName,
        lastName: lastName,
      });
      return done(null, newUser);
    }
    if (!user.githubId) {
      await User.findByIdAndUpdate(user._id, { githubId: id });
      user = await User.findOne({
        $or: [{ email: phone }, { phone: phone }, { githubID: id }],
      });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

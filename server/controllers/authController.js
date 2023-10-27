import { StatusCodes } from "http-status-codes";
import { hashPassword } from "../utils/passwordUtils.js";
import User from "../models/userModel.js";

// Register a new user and login after a successful registration
export const register = async (req, res) => {
  req.logout((err) => {
    if (err) {
      throw new Error("Error logging out, please try again");
    }
  });

  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";

  req.body.password = await hashPassword(req.body.password);
  const newUser = await User.create(req.body);

  req.login(newUser, (err) => {
    if (err) {
      throw new Error("Error logging in, please try again");
    }
    res.status(StatusCodes.CREATED).json({
      msg: `Welcome, ${req.user.firstName}`,
    });
  });
};

// Login user response after successful authentication using passport-local
export const login = async (req, res) => {
  console.log("from login");
  console.log(req.user);
  res
    .status(StatusCodes.OK)
    .json({ msg: `Welcome back, ${req.user.firstName}` });
};

// Logout user
export const logout = async (req, res) => {
  req.logout((err) => {
    if (err) {
      throw new Error("Error logging out, please try again");
    }
    res.status(StatusCodes.OK).json({ msg: `User logged out successfully` });
  });
};

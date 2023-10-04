import { StatusCodes } from "http-status-codes";
import { hashPassword } from "../utils/passwordUtils.js";
import User from "../models/userModel.js";

export const register = async (req, res) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";

  req.body.password = await hashPassword(req.body.password);
  const user = await User.create(req.body);
  req.login(user, (err) => {
    if (err) {
      throw new Error("Error logging in, please try again");
    }
    res.status(StatusCodes.CREATED).json({
      msg: `Welcome, ${req.user.firstName}`,
    });
  });
};

export const login = async (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ msg: `Welcome back, ${req.user.firstName}` });
};

export const logout = async (req, res) => {
  req.logout((err) => {
    if (err) {
      throw new Error("Error logging out, please try again");
    }
    res.status(StatusCodes.OK).json({ msg: `User logged out successfully` });
  });
};

import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";

export const getCurrentUser = (req, res) => {
  let user = null;
  if (req.user) {
    user = { ...req.user._doc };
    delete user.password;
  }
  res.status(StatusCodes.OK).json({ user: user });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.role;
  delete newUser.address;
  const updatedUser = await User.findByIdAndUpdate(req.user._id, newUser);
  res.status(StatusCodes.OK).json({ msg: "Profile updated" });
};

export const addAddress = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $push: { address: req.body } });
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Address added", address: req.body });
};

export const updateAddress = async (req, res) => {
  await User.updateOne(
    { "address._id": req.params.id },
    { "address.$": req.body }
  );
  res.status(StatusCodes.OK).json({ msg: "Address updated" });
};

export const deleteAddress = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { address: { _id: req.params.id } },
  });
  res.status(StatusCodes.OK).json({ msg: "Address deleted" });
};

export const addPayment = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $push: { payments: req.body } });
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Payment added", payments: req.body });
};

export const updatePayment = async (req, res) => {
  await User.updateOne(
    { "payments._id": req.params.id },
    { "payments.$": req.body }
  );
  res.status(StatusCodes.OK).json({ msg: "Payment updated" });
};

export const deletePayment = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { payments: { _id: req.params.id } },
  });
  res.status(StatusCodes.OK).json({ msg: "Payment deleted" });
};

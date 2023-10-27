import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { hashPassword } from "../utils/passwordUtils.js";
import cloudinary from "cloudinary";
import { formatImage } from "../middleware/multerMiddleware.js";

// Get current logged-in user details, send null if no user is logged-in
export const getCurrentUser = (req, res) => {
  let user = null;

  if (req.user) {
    user = { ...req.user._doc };
    delete user.password;
  }
  console.log(user);
  res.status(StatusCodes.OK).json({ user: user });
};

// Update current logged-in user profile
export const updateUser = async (req, res) => {
  const newUser = { ...req.body };

  // change password
  if (newUser.newPassword) {
    newUser.password = await hashPassword(newUser.password);
  } else {
    delete newUser.password;
  }

  // delete user fields that are not being updated
  delete newUser.role;
  delete newUser.address;
  delete newUser.payments;
  delete newUser.newPassword;
  delete newUser.repeatNewPassword;

  // upload avatar image and save details to newUser object
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file, {
      folder: "ShopCart/users",
    });
    newUser.image = { url: "", publicId: "" };
    newUser.image.url = response.secure_url;
    newUser.image.publicId = response.public_id;
  }

  // update user details
  const updatedUser = await User.findByIdAndUpdate(req.user._id, newUser);

  // remove previous avatar image from cloudinary using its publicId
  if (req.file && updatedUser.image.publicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.image.publicId);
  }

  res.status(StatusCodes.OK).json({ msg: "Profile updated" });
};

// Add a new address to user addresses
export const addAddress = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $push: { address: req.body } });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Address added", address: req.body });
};

// Update an address
export const updateAddress = async (req, res) => {
  await User.updateOne(
    { "address._id": req.params.id },
    { "address.$": req.body }
  );

  res.status(StatusCodes.OK).json({ msg: "Address updated" });
};

// Delete an address
export const deleteAddress = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { address: { _id: req.params.id } },
  });

  res.status(StatusCodes.OK).json({ msg: "Address deleted" });
};

// Add a new payment method to user payment methods
export const addPayment = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $push: { payments: req.body } });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Payment added", payments: req.body });
};

// Update a payment method
export const updatePayment = async (req, res) => {
  await User.updateOne(
    { "payments._id": req.params.id },
    { "payments.$": req.body }
  );

  res.status(StatusCodes.OK).json({ msg: "Payment updated" });
};

// Delete a payment method
export const deletePayment = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { payments: { _id: req.params.id } },
  });

  res.status(StatusCodes.OK).json({ msg: "Payment deleted" });
};

// Add/Update cart details to user - NOT IMPLEMENTED ON FRONT-END
export const updateCart = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { cart: req.body });

  res.status(StatusCodes.OK).json({ msg: "Cart Updated" });
};

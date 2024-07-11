import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel";
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "User do not exist! Please register",
    });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).json({
      message: "Password doesn't matched",
    });
  }

  // create token
  const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(201).json({
    message: "Logged in",
    token,
  });
};

const signup = async (req, res) => {};

const getUser = async (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
const updateUser = async (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
const deleteUser = async (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

export default { login, signup, getUser, updateUser, deleteUser };

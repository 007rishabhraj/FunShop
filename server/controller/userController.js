import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import sendToken from "../utils/sendToken.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({
        message: "User does not exist! Please register",
      });
    }

    // Validate password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({
        message: "Password does not match",
      });
    }

    // Generate JWT token
    const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Send response with token
    res.status(201).json({
      message: "Logged in successfully",
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); // Handle server error
  }
};

const signup = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists! Please login",
      });
    }

    // Create a new user instance
    user = new User({
      email,
      password, // Remember to hash the password before saving to database
    });

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    // Generate JWT token
    const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Respond with success message and token
    // res.status(201).json({
    //   message: "User registered successfully",
    //   token,
    // });
    sendToken(user,200,token,res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error"); // Handle server error
  }
};

const getUser = async (req, res) => {
  try {
    // Retrieve user from database by ID
    const user = await User.findById(req.params.id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Respond with user data
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); // Handle server error
  }
};

const updateUser = async (req, res) => {
  try {
    // Retrieve user from database by ID and update fields
    let user = await User.findById(req.params.id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update user fields based on request body
    const { email, password } = req.body;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Save the updated user to the database
    await user.save();

    // Respond with success message and updated user data
    res.json({
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); // Handle server error
  }
};

const deleteUser = async (req, res) => {
  try {
    // Find user by ID and delete from database
    const user = await User.findById(req.body);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Remove the user from the database
    await user.remove();

    // Respond with success message
    res.json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); // Handle server error
  }
};

const getAllUsers = async(req, res) => {
  const users = await User.find()
  if(users){
    res.status(200).json({
      success: 'true',
      body: users
    })
  }
}

export default { login, signup, getUser, updateUser, deleteUser, getAllUsers };

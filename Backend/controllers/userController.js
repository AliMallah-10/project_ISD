const User = require("../models/User"); // Import the User model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Function to register a new user
exports.registerUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const { role, username, password, names, email } = req.body;

    // Check if the username or email is already taken
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    if (!email.endsWith("@gmail.com")) {
      return res.status(400).json({
        message: "Email must be a Gmail address (e.g., example@gmail.com)",
      });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Assign a default role (e.g., "patient")
    // const defaultRole = "patient";
    const defaultRole = role || "patient";

    // Create a new user instance
    const newUser = new User({
      role: defaultRole,
      username,
      password: hashedPassword,
      names,
      email,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to log in a user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ message: "Invalid Username" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const role = user.role;
    // Create and send a JWT token for authentication

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30 minutes",
    });

    res
      .status(200)
      .json({ message: " Login  successfully", token, role, username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Extract the user ID from the request params

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user information without the password field
    res.status(200).json({
      user: {
        _id: user._id,
        role: user.role,
        username: user.username,
        names: user.names,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to update user information
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id; // Extract the user ID from the request params
    const { role, names, email, password } = req.body; // Extract updated user data

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user information
    user.names = names;
    user.email = email;
    user.role = role;

    // If a new password is provided, hash and update the password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    await user.save(); // Save the updated user data

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to delete a user account
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Extract the user ID from the request params

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne(); // Remove the user from the database

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to retrieve a list of all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude the password field from the results

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
// Function to get a user by username
exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params; // Extract the username from the request params

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user information without the password field
    res.status(200).json({
      user: {
        _id: user._id,
        role: user.role,
        username: user.username,
        names: user.names,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
// Function to get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }, "-password"); // Exclude the password field

    res.status(200).json({ doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
// Function to get a user by names
exports.getUserByNames = async (req, res) => {
  try {
    const names = req.params.names; // Extract the names from the request params

    const user = await User.findOne({ names });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user information without the password field
    res.status(200).json({
      user: {
        _id: user._id,
        role: user.role,
        username: user.username,
        names: user.names,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

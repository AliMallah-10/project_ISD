const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["doctor", "co-manager", "manager", "patient"],
    required: true, // Role is required
  },

  username: {
    type: String,
    required: true, // Username is required
    unique: true, // Username should be unique
  },
  password: {
    type: String,
    required: true, // Password is required
  },
  names: {
    type: String,
    required: true, // Name is required
  },
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Email should be unique
    validate: {
      validator: function (value) {
        // Use a regular expression or a library like validator.js to validate email format
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      },
      message: "Invalid email format",
    },
  },

  // Additional user-specific fields
});

// Pre-hook to hash the password before saving
// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (user.isModified("password")) {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword= await bcrypt.hash(user.password, salt);
//     user.password =hashedPassword
//   }
//   next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;

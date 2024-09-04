const mongoose = require("mongoose");

// Define user schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    address: { type: String },
    phoneNumber: { type: String },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

// Create user model
const User = mongoose.model("User", userSchema);

module.exports = User;

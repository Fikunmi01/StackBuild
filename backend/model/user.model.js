const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  dateJoined: {
    type: Date,
    default: new Date(),
  },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  picture: { type: Object, required: false },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String, required: false },
  role: {
    // Adding role field to differentiate users
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;

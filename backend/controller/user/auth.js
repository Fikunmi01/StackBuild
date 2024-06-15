const UserModel = require("../../model/user.model");
const { generateToken, verificationToken } = require("../../utils/token");
const { hashPassword, comparePassword } = require("../../utils/hashPassword");
const {
  successResponse,
  errorResponse,
} = require("../../utils/responseHandler");

const createUser = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, username } = req.body;

    const response = await UserModel.findOne({ email: email });

    if (response) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const token = verificationToken(6);

    const user = await UserModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      username,
      verificationToken: token,
    });

    const tokenValue = generateToken({
      id: user._id,
      username: user.username,
    });

    const { new_password, ...rest } = user.toJSON();

    return successResponse(
      res,
      { user: rest, token: tokenValue },
      "User created successfully"
    );
  } catch (err) {
    console.log("Error during creating account", err);
    return errorResponse(res, "Internal server error", 500);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Debug: Check email and password from request body
    console.log("Login attempt with email:", email);

    // Find user by email
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      console.log("User not found with email:", email);
      return errorResponse(res, "Invalid email or password", 400);
    }

    // Debug: User found, check password comparison
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      console.log("Incorrect password for email:", email);
      return errorResponse(res, "Incorrect password", 400);
    }

    // Debug: Password match, generating token
    const token = generateToken({
      id: user._id,
      username: user.username,
    });

    console.log("User logged in successfully with email:", email);
    return successResponse(res, { user, token }, "User logged in successfully");
  } catch (err) {
    console.log("Error during login:", err);
    return errorResponse(res, "Internal server error", 500);
  }
};


module.exports = {
  createUser,
  loginUser,
};

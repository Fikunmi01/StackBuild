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

    const existingUser = await UserModel.findOne({
      $or: [
        { email: email },
        { username: username }
      ]
    });

    if (existingUser) {
      return errorResponse(
        res,
        existingUser.email === email ? "Email already in use" : "Username already taken",
        400
      );
    }

    const hashedPassword = await hashPassword(password);
    const verificationCode = verificationToken(6);

    const user = await UserModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      username,
      verificationToken: verificationCode,
    });

    const token = generateToken({
      id: user._id,            // Changed from user.id to user._id
      username: user.username,
    });

    // Remove sensitive data before sending response
    const userResponse = user.toJSON();
    delete userResponse.password;
    delete userResponse.verificationToken;

    return successResponse(
      res,
      {
        user: userResponse,
        token
      },
      "User created successfully"
    );
  } catch (err) {
    console.error("Error during account creation:", err);
    return errorResponse(res, err.message || "Internal server error", err.status || 500);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email })
      .select('+password');  // In case password field is set to select: false

    if (!user) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    const token = generateToken({
      id: user._id,            // Changed from user.id to user._id
      username: user.username,
    });

    // Remove sensitive data before sending response
    const userResponse = user.toJSON();
    delete userResponse.password;
    delete userResponse.verificationToken;

    return successResponse(
      res,
      {
        user: userResponse,
        token
      },
      "Login successful"
    );
  } catch (err) {
    console.error("Error during login:", err);
    return errorResponse(res, "Internal server error", 500);
  }
};


module.exports = {
  createUser,
  loginUser,
};

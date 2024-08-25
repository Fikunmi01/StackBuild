const UserModel = require("../../model/user.model");
const { successResponse, errorResponse } = require("../../utils/responseHandler");

const listUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    return successResponse(res, users, "Users retrieved successfully");
  } catch (err) {
    console.error("Error listing users:", err);
    return errorResponse(res, "Internal server error", 500);
  }
};

module.exports = {
  listUsers,
};
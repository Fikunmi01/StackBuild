const UserModel = require("../../model/user.model");
const UploadProfilePicture = require("./upload");
const formidable = require("formidable");
const {
  successResponse,
  errorResponse,
} = require("../../utils/responseHandler");

const profile = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return errorResponse(res, "Not Found", 400);
    }

    return successResponse(res, user, "User fetched successfully");
  } catch (err) {
    console.error("Error fetching user:", err);
    return errorResponse(res, "Internal server error", 500);
  }
};

const uploadDP = async (req, res, next) => {
  const userId = req.params.userId;

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error uploading profile picture:", err);
      return errorResponse(res, "Error uploading profile picture:", 500);
    }

    if (!files || !files.image) {
      return errorResponse(res, "Please upload an image", 400);
    }

    try {
      const { image } = files;
      const file = image[0];
      const mimeType = file.mimetype;

      if (file.size > 1000000) {
        return errorResponse(res, "Image size should not exceed 1MB", 500);
      }

      if (!mimeType.includes("image")) {
        return errorResponse(res, "Please upload an image", 500);
      }

      const imageFile = file.filepath;

      const user = await UploadProfilePicture(userId, imageFile);

      return successResponse(
        res,
        user,
        "Profile picture uploaded successfully"
      );
    } catch (err) {
      console.error("Error uploading profile picture:", err);
      return errorResponse(res, "Internal server error", 500);
    }
  });
};

const updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const allowedUpdates = ['firstName', 'lastName', 'email', 'phoneNumber', 'username'];
  const updateData = Object.keys(req.body).reduce((acc, key) => {
    if (allowedUpdates.includes(key) && req.body[key] !== undefined) {
      acc[key] = req.body[key];
    }
    return acc;
  }, {});

  console.log(updateData)

  try {
    // Fetch the user data
    const user = await UserModel.findById(userId);

    console.log(user)

    if (!user) {
      return errorResponse(res, "User not found", 400);
    }

    // Update the user fields
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    return successResponse(res, updatedUser, "User updated successfully");
  } catch (err) {
    console.log("Error updating user:", err);
    return errorResponse(res, "Internal server error", 500);
  }
};

module.exports = {
  profile,
  updateUser,
  uploadDP,
};

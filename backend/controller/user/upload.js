const userModel = require("../../model/user.model");
const { uploadToCloudinary } = require("../../services/upload.service");

export const UploadProfilePicture = async (userId, file) => {
  const user = await userModel.findById(userId);

  if (!user) throw new Error("User not found");

  // Conditionally add public_id if user already has a profile picture
  const uploadOptions = user.picture
    ? { public_id: user.picture.id }
    : { folder: "profile_pictures" };

  const picture = await uploadToCloudinary(file, uploadOptions);

  user.picture = picture;

  await user.save();

  return user;
};

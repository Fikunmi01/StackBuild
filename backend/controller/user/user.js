const UserModel = require('../../model/user.model');
const UploadProfilePicture = require('./upload')
const formidable = require('formidable');
const { successResponse, errorResponse } = require('../../utils/responseHandler');

const profile = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const user = await UserModel.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        return successResponse(res, user, 'User fetched successfully');
    } catch (err) {
        console.error('Error fetching user:', err);
        return errorResponse(res, 'Internal server error', 500);
    }
};

const uploadDP = async (req, res, next) => {
    const userId = req.params.userId;

    if (req.user.id !== userId) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    };

    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Error uploading profile picture:', err);
            return res.status(500).json({
                status: 500,
                message: 'Internal server error',
            });
        }

        if (!files || !files.image) {
            return res.status(400).json({
                status: 400,
                message: 'Please upload an image',
            });
        }

        try {
            const { image } = files;
            const file = image[0];
            const mimeType = file.mimetype;

            if (file.size > 1000000) {
                return res.status(400).json({
                    status: 400,
                    message: 'Image size should not exceed 1MB',
                });
            }

            if (!mimeType.includes('image')) {
                return res.status(400).json({
                    status: 400,
                    message: 'Please upload an image',
                });
            }

            const imageFile = file.filepath;

            const user = await UploadProfilePicture(userId, imageFile);

            return successResponse(res, user, 'Profile picture uploaded successfully');

        } catch (err) {
            console.error('Error uploading profile picture:', err);
            return errorResponse(res, 'Internal server error', 500);
        }
    });

}

const updateUser = async (req, res, next) => {
    const { firstName, lastName, email, phoneNumber, username } = req.body;

    const _id = req.user.id;

    console.log(_id, req.user)
  
    // Check if the user is trying to update the username
    const isUsernameUpdate = username !== undefined;
  
    // Fetch the user data
    const user = await UserModel.findById(_id);
  
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }
  
    // Check if username update is allowed based on previous updates
    if (isUsernameUpdate && user.usernameUpdates >= 1) {
      return res.status(403).json({
        status: 403,
        message: 'Username can only be updated once',
      });
    }
  
    // Prepare update data (exclude username if update not allowed)
    const updateData = {
      firstName,
      lastName,
      email,
      phoneNumber,
    };
    if (isUsernameUpdate) {
      updateData.username = username;
      user.usernameUpdates++; // Increment username update count
    }
  
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        _id,
        updateData,
        { new: true }
      );
  
      return successResponse(res, updatedUser, 'User updated successfully');
    } catch (err) {
      console.error('Error updating user:', err);
      return errorResponse(res, 'Internal server error', 500);
    }
  };
  

module.exports = {
    profile,
    updateUser,
    uploadDP
};
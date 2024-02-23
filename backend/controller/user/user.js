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

    // if (req.user._id !== userId) {
    //     return res.status(401).json({
    //         message: "Unauthorized"
    //     })
    // };

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
    const { firstName, lastName, email, phoneNumber, imgSrc, username } = req.body;
    const updateData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        imgSrc: imgSrc,
        username: username
    }

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { id: _id },
            updateData,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                status: 404,
                message: 'User not found',
            });
        }

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
const UserModel = require("../model/userModel");

exports.updateUser = async (req, res, next) => {
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

        return res.status(200).json({
            status: 200,
            message: 'User updated successfully',
            user: updatedUser,
        });
    } catch (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
        });
    }
};
const UserModel = require('../../model/user.model');

const profile = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user.userId);

        if (!user) {
            res.send({
                status: 404,
                message: "User not found"
            });
        } else {
            res.send({
                status: 200,
                message: "User profile fetched successfully",
                user: user
            });
        }
    } catch (err) {
        console.log("Error during fetching profile", err);
        res.send({
            status: 500,
            message: "Internal server error"
        });
    }
};

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

module.exports = {
    profile,
    updateUser
};
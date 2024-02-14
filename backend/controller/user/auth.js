const UserModel = require('../../model/user.model');
const { generateToken, verificationToken } = require('../../utils/token');
const { hashPassword, comparePassword } = require('../../utils/hashPassword');
const {
    successResponse,
    errorResponse,
} = require('../../utils/responseHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = async (req, res, next) => {
    const { email, password, firstName, lastName, username } = req.body;

    try {
        const response = await UserModel.findOne({ email: email });

        if (response) {
            throw new Error('User already exists');
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
            userId: user._id,
            username: user.username,
        });

        return successResponse(
            res,
            { user, token: tokenValue },
            'User created successfully'
        );
    } catch (err) {
        console.log('Error during creating account', err);
        return errorResponse(res, 'Internal server error', 500);
    }
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try{
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        const token = generateToken({
            userId: user._id,
            username: user.username,
        });

        return successResponse(res, { user, token }, 'User logged in successfully');
    
    } catch (err) {
        console.log('Error during login', err);
        return errorResponse(res, 'Internal server error', 500);
    }
};

module.exports = {
    createUser,
    loginUser,
};

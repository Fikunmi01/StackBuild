const UserModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createUser = async (req, res, next) => {
    const { email, password, firstName, lastName, username } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            res.send({
                status: 409,
                message: "User already exists"
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            let newUser = new UserModel({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
                username: username,
            });

            const userPayload = newUser.toObject();

            const token = jwt.sign(userPayload, process.env.SECRET_KEY);
            newUser.token = token
            await newUser.save();
            console.log("User successfully created");
            res.send({
                status: 200,
                message: "Account successfully created",
            });
        }
    } catch (err) {
        console.log("Error during creating account", err);
        res.send({
            status: 500,
            message: "Internal server error"
        });
    }
};

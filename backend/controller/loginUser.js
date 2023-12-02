const UserModel = require("../model/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email: email });

        if (!existingUser) {
            res.send({
                status: 401,
                message: "No account associated with this email"
            });
        } else {
            const matchPassword = await bcrypt.compare(password, existingUser.password);

            if (matchPassword) {
                console.log('User successfully logged in');

                try {
                    const tokenValue = jwt.sign({ userId: existingUser.id, username:existingUser.username }, process.env.SECRET_KEY, { expiresIn: '1h' })
                          // Fetch user data from the database
                          const user = await UserModel.findOne({ _id: existingUser._id });
                    
                    res.send({
                        status: 200,
                        message: "User successfully logged in",
                        username: existingUser.username,
                        token: tokenValue,
                        user:user
                    });console.log('hdjdjd',user)

                } catch (err) {
                    console.log("Token verification failed", err);
                    res.send({
                        status: 401,
                        message: "Token verification failed"
                    });

                }

            } else {
                res.send({
                    status: 401,
                    message: "Incorrect email address or password"
                });
            }
        }
    } catch (err) {
        console.log("Error during login", err);
        res.send({
            status: 500,
            message: "Internal server error"
        });
    }
};

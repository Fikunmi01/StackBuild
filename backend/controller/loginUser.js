const UserModel = require("../model/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'ASA';

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
                    const tokenValue = jwt.sign({ userId: existingUser.id }, SECRET_KEY, { expiresIn: '1h' })
                    res.send({
                        status: 200,
                        message: "User successfully logged in",
                        username: existingUser.username,
                        token: tokenValue
                    });
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

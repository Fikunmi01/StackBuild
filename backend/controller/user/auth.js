const UserModel = require('../../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = async (req, res, next) => {
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

const loginUser = async (req, res, next) => {
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

module.exports = {
    createUser,
    loginUser
};
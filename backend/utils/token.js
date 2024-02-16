const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// generate token
const generateToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    return { accessToken, refreshToken };
};

const verificationToken = (length) => {
    let result = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }

    return result;
};

module.exports = { generateToken, verificationToken };

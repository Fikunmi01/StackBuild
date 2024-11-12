const jwt = require('jsonwebtoken');

// Generate JWT token for authentication
const generateToken = (userData) => {
    try {
        return jwt.sign(
            {
                _id: userData.id,        // Make sure this matches with auth middleware
                username: userData.username,
                // Add any other necessary user data
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '24h'  // Token expires in 24 hours
            }
        );
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Failed to generate authentication token');
    }
};

// Generate numeric verification token for email/phone verification
const verificationToken = (length = 6) => {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
};

// Optional: Add a function to verify tokens
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('Error verifying token:', error);
        throw new Error('Invalid token');
    }
};

// Optional: Generate refresh token if you want to implement refresh token functionality
const generateRefreshToken = (userData) => {
    try {
        return jwt.sign(
            {
                _id: userData.id,
                username: userData.username,
            },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: '7d'  // Refresh token expires in 7 days
            }
        );
    } catch (error) {
        console.error('Error generating refresh token:', error);
        throw new Error('Failed to generate refresh token');
    }
};

module.exports = {
    generateToken,
    verificationToken,
    verifyToken,
    generateRefreshToken
};
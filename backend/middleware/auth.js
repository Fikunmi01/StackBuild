const { errorResponse } = require('../utils/responseHandler');
const jwt = require('jsonwebtoken');

const extractToken = (req) => {
    // Check authorization header first
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        return req.headers.authorization.split(' ')[1];
    }
    // Fallback to query parameter
    if (req.query && req.query.token) {
        return req.query.token;
    }
    // Check cookies if you want to support cookie-based authentication
    if (req.cookies && req.cookies.token) {
        return req.cookies.token;
    }
    return null;
};

const auth = async (req, res, next) => {
    try {
        const token = extractToken(req);

        if (!token) {
            console.log('Authentication failed: No token provided');
            return errorResponse(res, 'Authentication required. Please provide a valid token.', 401);
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log('Token verification error:', err.name);

                if (err.name === 'TokenExpiredError') {
                    return errorResponse(res, 'Your session has expired. Please login again.', 401);
                }

                if (err.name === 'JsonWebTokenError') {
                    return errorResponse(res, 'Invalid authentication token. Please login again.', 401);
                }

                return errorResponse(res, 'Authentication failed. Please try again.', 401);
            }

            // Ensure decoded contains user information
            if (!decoded._id) {
                console.log('Token missing user ID');
                return errorResponse(res, 'Invalid token format', 401);
            }

            // Add user data to request
            req.user = {
                _id: decoded._id,
                email: decoded.email,
                username: decoded.username,
                role: decoded.role,
                // Add any other user properties you need
            };

            // Log successful authentication
            console.log(`User ${decoded._id} authenticated successfully`);

            next();
        });
    } catch (error) {
        console.error('Auth Middleware Critical Error:', error);
        return errorResponse(res, 'Authentication service temporarily unavailable', 500);
    }
};

// Optional: Add a middleware to check for specific roles
const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return errorResponse(res, 'Authentication required', 401);
        }

        if (req.user.role !== role) {
            return errorResponse(res, 'Insufficient permissions', 403);
        }

        next();
    };
};

module.exports = {
    auth,
    requireRole
};
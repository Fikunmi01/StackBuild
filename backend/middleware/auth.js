const { errorResponse } = require('../utils/responseHandler');
const { verify } = require('jsonwebtoken');

const extractToken = (req) => {
    const token = req.headers.authorization;

    if (token && token.startsWith('Bearer ')) {
        return token.split(' ')[1];
    }

    return null;
};

const auth = async (req, res, next) => {
    const token = extractToken(req);

    if (!token) {
        return errorResponse(res, 'Unauthorized', 401);
    }

    verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return errorResponse(res, 'Token expired', 401);
            }

            if (err.name === 'JsonWebTokenError') {
                return errorResponse(res, 'Invalid token', 401);
            }

            return errorResponse(res, 'Unauthorized', 401);
        }

        req.user = decoded;
        return next();
    });
};

module.exports = {
    auth
};

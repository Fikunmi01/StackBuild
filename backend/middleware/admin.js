
const { errorResponse } = require("../utils/responseHandler");

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return errorResponse(res, "Unauthorized", 401);
  }
};

module.exports = isAdmin;
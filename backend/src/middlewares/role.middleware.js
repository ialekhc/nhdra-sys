const ApiError = require('../utils/ApiError');
const { STATUS_CODES } = require('../constants/statusCodes');

const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(STATUS_CODES.UNAUTHORIZED, 'Unauthorized'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(STATUS_CODES.FORBIDDEN, 'Insufficient role access'));
    }

    return next();
  };
};

module.exports = { allowRoles };

const { PERMISSIONS } = require('../constants/permissions');
const ApiError = require('../utils/ApiError');
const { STATUS_CODES } = require('../constants/statusCodes');

const requirePermission = (permissionKey) => {
  return (req, res, next) => {
    const allowedRoles = PERMISSIONS[permissionKey] || [];

    if (!req.user) {
      return next(new ApiError(STATUS_CODES.UNAUTHORIZED, 'Unauthorized'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(STATUS_CODES.FORBIDDEN, 'Permission denied'));
    }

    return next();
  };
};

module.exports = { requirePermission };

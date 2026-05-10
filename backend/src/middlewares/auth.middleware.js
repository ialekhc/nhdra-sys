const jwt = require('jsonwebtoken');
const { env } = require('../config/env');
const ApiError = require('../utils/ApiError');
const { STATUS_CODES } = require('../constants/statusCodes');
const { User } = require('../modules/users/user.model');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    const token = bearerToken || req.cookies?.token;

    if (!token) {
      return next(new ApiError(STATUS_CODES.UNAUTHORIZED, 'Authentication token is required'));
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('+password');

    if (!user || user.status !== 'active') {
      return next(new ApiError(STATUS_CODES.UNAUTHORIZED, 'Invalid or inactive user'));
    }

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return next();
  } catch (error) {
    return next(new ApiError(STATUS_CODES.UNAUTHORIZED, 'Invalid token'));
  }
};

module.exports = { authMiddleware };

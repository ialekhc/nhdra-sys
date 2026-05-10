const ApiError = require('../../utils/ApiError');
const { User } = require('../users/user.model');
const { findByEmail } = require('../users/user.repository');
const { generateToken } = require('../../utils/generateToken');
const { AuditLog } = require('../audit-logs/auditLog.model');

const loginService = async (email, password) => {
  const user = await findByEmail(email);
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  if (user.status !== 'active') {
    throw new ApiError(403, 'User account is inactive');
  }

  const passwordMatched = await user.comparePassword(password);
  if (!passwordMatched) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken({ id: user._id, role: user.role, email: user.email });

  user.lastLogin = new Date();
  await user.save();

  await AuditLog.create({
    action: 'LOGIN',
    module: 'auth',
    entityId: String(user._id),
    performedBy: user._id,
    role: user.role,
    method: 'POST',
    endpoint: '/auth/login',
    statusCode: 200,
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      department: user.department,
      phone: user.phone,
    },
  };
};

const logoutService = async (user) => {
  if (user?.id) {
    await AuditLog.create({
      action: 'LOGOUT',
      module: 'auth',
      entityId: String(user.id),
      performedBy: user.id,
      role: user.role,
      method: 'POST',
      endpoint: '/auth/logout',
      statusCode: 200,
    });
  }
};

const getCurrentUserService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, 'User not found');

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    department: user.department,
    phone: user.phone,
  };
};

const changePasswordService = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select('+password');
  if (!user) throw new ApiError(404, 'User not found');

  const passwordMatched = await user.comparePassword(currentPassword);
  if (!passwordMatched) throw new ApiError(401, 'Current password is incorrect');

  user.password = newPassword;
  await user.save();

  await AuditLog.create({
    action: 'CHANGE_PASSWORD',
    module: 'auth',
    entityId: String(user._id),
    performedBy: user._id,
    role: user.role,
    method: 'PUT',
    endpoint: '/auth/change-password',
    statusCode: 200,
  });

  return true;
};

module.exports = {
  loginService,
  logoutService,
  getCurrentUserService,
  changePasswordService,
};

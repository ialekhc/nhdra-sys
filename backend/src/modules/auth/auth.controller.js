const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const {
  loginService,
  logoutService,
  getCurrentUserService,
  changePasswordService,
} = require('./auth.service');

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await loginService(email, password);

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json(new ApiResponse(200, 'Login successful', { token, user }));
});

const logout = asyncHandler(async (req, res) => {
  await logoutService(req.user);
  res.clearCookie('token');
  res.status(200).json(new ApiResponse(200, 'Logout successful', null));
});

const me = asyncHandler(async (req, res) => {
  const user = await getCurrentUserService(req.user.id);
  res.status(200).json(new ApiResponse(200, 'Current user fetched successfully', user));
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await changePasswordService(req.user.id, currentPassword, newPassword);
  res.status(200).json(new ApiResponse(200, 'Password changed successfully', null));
});

module.exports = { login, logout, me, changePassword };

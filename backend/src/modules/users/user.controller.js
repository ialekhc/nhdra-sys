const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const {
  getUsers,
  createUserService,
  getUserByIdService,
  updateUserService,
  updateUserStatusService,
  deleteUserService,
} = require('./user.service');

const getAllUsers = asyncHandler(async (req, res) => {
  const { users, meta } = await getUsers(req.query);
  res.status(200).json(new ApiResponse(200, 'Users fetched successfully', users, meta));
});

const createUserController = asyncHandler(async (req, res) => {
  const user = await createUserService(req.body, req.user.id);
  res.status(201).json(new ApiResponse(201, 'User created successfully', user));
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await getUserByIdService(req.params.id);
  res.status(200).json(new ApiResponse(200, 'User fetched successfully', user));
});

const updateUserController = asyncHandler(async (req, res) => {
  const user = await updateUserService(req.params.id, req.body, req.user.id);
  res.status(200).json(new ApiResponse(200, 'User updated successfully', user));
});

const updateUserStatusController = asyncHandler(async (req, res) => {
  const user = await updateUserStatusService(req.params.id, req.body.status, req.user.id);
  res.status(200).json(new ApiResponse(200, 'User status updated successfully', user));
});

const deleteUserController = asyncHandler(async (req, res) => {
  await deleteUserService(req.params.id);
  res.status(200).json(new ApiResponse(200, 'User deleted successfully', null));
});

module.exports = {
  getAllUsers,
  createUserController,
  getUserById,
  updateUserController,
  updateUserStatusController,
  deleteUserController,
};

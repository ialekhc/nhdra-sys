const ApiError = require('../../utils/ApiError');
const { getPagination } = require('../../utils/pagination');
const {
  findByEmail,
  createUser,
  listUsers,
  findUserById,
  updateUserById,
  deleteUserById,
} = require('./user.repository');

const getUsers = async (query) => {
  const { page, limit, skip } = getPagination(query);
  const search = query.search?.trim();

  const filter = search
    ? {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
        ],
      }
    : {};

  const { items, total } = await listUsers(filter, { limit, skip });

  return {
    users: items,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};

const createUserService = async (payload, actorId) => {
  const existing = await findByEmail(payload.email);
  if (existing) {
    throw new ApiError(409, 'Email already exists');
  }

  return createUser({
    ...payload,
    createdBy: actorId,
    updatedBy: actorId,
  });
};

const getUserByIdService = async (id) => {
  const user = await findUserById(id);
  if (!user) throw new ApiError(404, 'User not found');
  return user;
};

const updateUserService = async (id, payload, actorId) => {
  const user = await findUserById(id);
  if (!user) throw new ApiError(404, 'User not found');

  if (payload.email && payload.email !== user.email) {
    const existing = await findByEmail(payload.email);
    if (existing && String(existing._id) !== String(id)) {
      throw new ApiError(409, 'Email already exists');
    }
  }

  return updateUserById(id, { ...payload, updatedBy: actorId });
};

const updateUserStatusService = async (id, status, actorId) => {
  const user = await findUserById(id);
  if (!user) throw new ApiError(404, 'User not found');

  return updateUserById(id, { status, updatedBy: actorId });
};

const deleteUserService = async (id) => {
  const user = await findUserById(id);
  if (!user) throw new ApiError(404, 'User not found');

  return deleteUserById(id);
};

module.exports = {
  getUsers,
  createUserService,
  getUserByIdService,
  updateUserService,
  updateUserStatusService,
  deleteUserService,
};

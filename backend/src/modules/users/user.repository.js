const { User } = require('./user.model');

const findByEmail = (email) => User.findOne({ email }).select('+password');

const createUser = (payload) => User.create(payload);

const listUsers = async (filter, options) => {
  const [items, total] = await Promise.all([
    User.find(filter)
      .sort({ createdAt: -1 })
      .skip(options.skip)
      .limit(options.limit),
    User.countDocuments(filter),
  ]);

  return { items, total };
};

const findUserById = (id) => User.findById(id);

const updateUserById = (id, payload) => User.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

const deleteUserById = (id) => User.findByIdAndDelete(id);

module.exports = {
  findByEmail,
  createUser,
  listUsers,
  findUserById,
  updateUserById,
  deleteUserById,
};

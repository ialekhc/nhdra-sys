const { connectDb } = require('../config/db');
const { User } = require('../modules/users/user.model');
const { ROLES } = require('../constants/roles');

const resetSuperAdmin = async () => {
  await connectDb();

  const email = 'admin@cardiodiabetic.local';
  const password = 'Admin@12345';

  let user = await User.findOne({ email }).select('+password');

  if (!user) {
    user = await User.create({
      name: 'Super Admin',
      email,
      password,
      role: ROLES.SUPER_ADMIN,
      status: 'active',
    });
    // eslint-disable-next-line no-console
    console.log('Super Admin created with default credentials');
    process.exit(0);
  }

  user.name = 'Super Admin';
  user.role = ROLES.SUPER_ADMIN;
  user.status = 'active';
  user.password = password;
  await user.save();

  // eslint-disable-next-line no-console
  console.log('Super Admin credentials reset successfully');
  process.exit(0);
};

resetSuperAdmin().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to reset super admin', error);
  process.exit(1);
});

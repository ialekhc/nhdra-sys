const { connectDb } = require('../config/db');
const { User } = require('../modules/users/user.model');
const { ROLES } = require('../constants/roles');

const seedAdmin = async () => {
  await connectDb();

  const email = 'admin@cardiodiabetic.local';

  const existing = await User.findOne({ email });
  if (existing) {
    // eslint-disable-next-line no-console
    console.log('Super Admin already exists');
    process.exit(0);
  }

  await User.create({
    name: 'Super Admin',
    email,
    password: 'Admin@12345',
    role: ROLES.SUPER_ADMIN,
    status: 'active',
  });

  // eslint-disable-next-line no-console
  console.log('Super Admin seeded successfully');
  process.exit(0);
};

seedAdmin().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to seed super admin', error);
  process.exit(1);
});

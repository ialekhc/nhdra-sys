const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app } = require('../app');
const { User } = require('../modules/users/user.model');
const { ROLES } = require('../constants/roles');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create({
    instance: { ip: '127.0.0.1' },
  });
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('Auth module', () => {
  it('should login with valid credentials', async () => {
    await User.create({
      name: 'Super Admin',
      email: 'admin@cardiodiabetic.local',
      password: 'Admin@12345',
      role: ROLES.SUPER_ADMIN,
      status: 'active',
    });

    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'admin@cardiodiabetic.local',
      password: 'Admin@12345',
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBeTruthy();
  });

  it('should reject invalid credentials', async () => {
    await User.create({
      name: 'Super Admin',
      email: 'admin@cardiodiabetic.local',
      password: 'Admin@12345',
      role: ROLES.SUPER_ADMIN,
      status: 'active',
    });

    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'admin@cardiodiabetic.local',
      password: 'WrongPassword123',
    });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });
});

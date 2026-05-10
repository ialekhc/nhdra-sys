const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app } = require('../app');
const { User } = require('../modules/users/user.model');
const { Patient } = require('../modules/patients/patient.model');
const { ROLES } = require('../constants/roles');

let mongoServer;
let token;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create({
    instance: { ip: '127.0.0.1' },
  });
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  await User.create({
    name: 'Staff User',
    email: 'staff@cardiodiabetic.local',
    password: 'Staff@12345',
    role: ROLES.STAFF,
    status: 'active',
  });

  const loginResponse = await request(app).post('/api/v1/auth/login').send({
    email: 'staff@cardiodiabetic.local',
    password: 'Staff@12345',
  });

  token = loginResponse.body.data.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await Patient.deleteMany({});
});

describe('Patient module', () => {
  it('should create patient', async () => {
    const payload = {
      fullName: 'John Doe',
      age: 55,
      gender: 'Male',
      phone: '9800000000',
      treatmentConsent: true,
      researchConsent: true,
    };

    const response = await request(app)
      .post('/api/v1/patients')
      .set('Authorization', `Bearer ${token}`)
      .send(payload);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.patientId).toBeTruthy();
    expect(response.body.data.researchId).toBeTruthy();
  });

  it('should prevent duplicate active patient with same fullName and phone', async () => {
    const payload = {
      fullName: 'Jane Doe',
      age: 48,
      gender: 'Female',
      phone: '9811111111',
      treatmentConsent: true,
    };

    await request(app)
      .post('/api/v1/patients')
      .set('Authorization', `Bearer ${token}`)
      .send(payload);

    const duplicateResponse = await request(app)
      .post('/api/v1/patients')
      .set('Authorization', `Bearer ${token}`)
      .send(payload);

    expect(duplicateResponse.status).toBe(409);
    expect(duplicateResponse.body.success).toBe(false);
  });
});

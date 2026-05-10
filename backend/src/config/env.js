const dotenv = require('dotenv');

dotenv.config();

const mongoSource = (process.env.MONGO_SOURCE || 'local').toLowerCase();
const mongoUriLocal = process.env.MONGO_URI_LOCAL || 'mongodb://127.0.0.1:27017/cardio-diabetic';
const mongoUriAtlas = process.env.MONGO_URI_ATLAS || '';

const mongoUri =
  process.env.MONGO_URI ||
  (mongoSource === 'atlas' ? mongoUriAtlas : mongoUriLocal) ||
  mongoUriLocal;

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 5000),
  MONGO_SOURCE: mongoSource,
  MONGO_URI: mongoUri,
  MONGO_URI_LOCAL: mongoUriLocal,
  MONGO_URI_ATLAS: mongoUriAtlas,
  JWT_SECRET: process.env.JWT_SECRET || 'replace_me',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  UPLOAD_DIR: process.env.UPLOAD_DIR || 'uploads',
};

module.exports = { env };

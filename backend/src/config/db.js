const mongoose = require('mongoose');
const { env } = require('./env');
const logger = require('../utils/logger');

const connectDb = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(env.MONGO_URI);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection failed', error);
    throw error;
  }
};

module.exports = { connectDb };

const { app } = require('./app');
const { connectDb } = require('./config/db');
const { env } = require('./config/env');
const logger = require('./utils/logger');

const startServer = async () => {
  await connectDb();

  app.listen(env.PORT, () => {
    logger.info(`Server started on port ${env.PORT}`);
  });
};

startServer().catch((error) => {
  logger.error('Failed to start server', error);
  process.exit(1);
});

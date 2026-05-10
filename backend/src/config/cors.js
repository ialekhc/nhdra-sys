const { env } = require('./env');

const whitelist = env.CLIENT_URL.split(',').map((url) => url.trim());

const corsOptions = {
  origin(origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('CORS policy violation'));
  },
  credentials: true,
};

module.exports = { corsOptions };

const ApiError = require('../utils/ApiError');

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const payload = {
        body: req.body,
        params: req.params,
        query: req.query,
      };

      schema.parse(payload);
      next();
    } catch (error) {
      const errors = error.errors?.map((item) => ({
        path: item.path.join('.'),
        message: item.message,
      })) || [];

      next(new ApiError(400, 'Validation failed', errors));
    }
  };
};

module.exports = { validate };

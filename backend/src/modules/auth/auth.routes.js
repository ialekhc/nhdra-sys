const express = require('express');
const { validate } = require('../../middlewares/validate.middleware');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { loginRateLimit } = require('../../middlewares/rateLimit.middleware');
const { login, logout, me, changePassword } = require('./auth.controller');
const { loginSchema, changePasswordSchema } = require('./auth.validation');

const router = express.Router();

router.post('/login', loginRateLimit, validate(loginSchema), login);
router.post('/logout', authMiddleware, logout);
router.get('/me', authMiddleware, me);
router.put('/change-password', authMiddleware, validate(changePasswordSchema), changePassword);

module.exports = { authRoutes: router };

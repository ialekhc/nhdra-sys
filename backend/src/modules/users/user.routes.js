const express = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { requirePermission } = require('../../middlewares/permission.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const { auditMiddleware } = require('../../middlewares/audit.middleware');
const {
  getAllUsers,
  createUserController,
  getUserById,
  updateUserController,
  updateUserStatusController,
  deleteUserController,
} = require('./user.controller');
const {
  createUserSchema,
  updateUserSchema,
  updateUserStatusSchema,
  idParamSchema,
} = require('./user.validation');

const router = express.Router();

router.use(authMiddleware);

router.get('/', requirePermission('MANAGE_USERS'), getAllUsers);
router.post('/', requirePermission('MANAGE_USERS'), validate(createUserSchema), auditMiddleware('CREATE', 'users'), createUserController);
router.get('/:id', requirePermission('MANAGE_USERS'), validate(idParamSchema), getUserById);
router.put('/:id', requirePermission('MANAGE_USERS'), validate(updateUserSchema), auditMiddleware('UPDATE', 'users'), updateUserController);
router.patch('/:id/status', requirePermission('MANAGE_USERS'), validate(updateUserStatusSchema), auditMiddleware('STATUS_UPDATE', 'users'), updateUserStatusController);
router.delete('/:id', requirePermission('MANAGE_USERS'), validate(idParamSchema), auditMiddleware('DELETE', 'users'), deleteUserController);

module.exports = { userRoutes: router };

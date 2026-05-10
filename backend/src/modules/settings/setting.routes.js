const express = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { requirePermission } = require('../../middlewares/permission.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const { auditMiddleware } = require('../../middlewares/audit.middleware');
const { getAllSettings, updateSetting } = require('./setting.controller');
const { updateSettingSchema } = require('./setting.validation');

const router = express.Router();

router.use(authMiddleware);

router.get('/', requirePermission('MANAGE_SETTINGS'), getAllSettings);
router.put('/:key', requirePermission('MANAGE_SETTINGS'), validate(updateSettingSchema), auditMiddleware('UPDATE', 'settings'), updateSetting);

module.exports = { settingRoutes: router };

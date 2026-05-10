const express = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { requirePermission } = require('../../middlewares/permission.middleware');
const { getAuditLogs } = require('./auditLog.controller');

const router = express.Router();

router.use(authMiddleware);
router.get('/', requirePermission('VIEW_AUDIT_LOGS'), getAuditLogs);

module.exports = { auditLogRoutes: router };

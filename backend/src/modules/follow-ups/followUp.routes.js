const express = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { requirePermission } = require('../../middlewares/permission.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const { auditMiddleware } = require('../../middlewares/audit.middleware');
const {
  getFollowUps,
  createFollowUpController,
  getTodayFollowUps,
  getMissedFollowUps,
  getFollowUpsByPatient,
  updateFollowUpController,
  updateFollowUpStatusController,
} = require('./followUp.controller');
const {
  createFollowUpSchema,
  updateFollowUpSchema,
  updateFollowUpStatusSchema,
  patientParamSchema,
} = require('./followUp.validation');

const router = express.Router();

router.use(authMiddleware);

router.get('/', requirePermission('MANAGE_FOLLOWUPS'), getFollowUps);
router.post('/', requirePermission('MANAGE_FOLLOWUPS'), validate(createFollowUpSchema), auditMiddleware('CREATE', 'follow-ups'), createFollowUpController);
router.get('/today', requirePermission('MANAGE_FOLLOWUPS'), getTodayFollowUps);
router.get('/missed', requirePermission('MANAGE_FOLLOWUPS'), getMissedFollowUps);
router.get('/patient/:patientId', requirePermission('MANAGE_FOLLOWUPS'), validate(patientParamSchema), getFollowUpsByPatient);
router.put('/:id', requirePermission('MANAGE_FOLLOWUPS'), validate(updateFollowUpSchema), auditMiddleware('UPDATE', 'follow-ups'), updateFollowUpController);
router.patch('/:id/status', requirePermission('MANAGE_FOLLOWUPS'), validate(updateFollowUpStatusSchema), auditMiddleware('STATUS_UPDATE', 'follow-ups'), updateFollowUpStatusController);

module.exports = { followUpRoutes: router };

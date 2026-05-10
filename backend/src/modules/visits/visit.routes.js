const express = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { requirePermission } = require('../../middlewares/permission.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const { auditMiddleware } = require('../../middlewares/audit.middleware');
const {
  getVisits,
  createVisitController,
  getVisitById,
  getVisitsByPatient,
  updateVisitController,
  updateVisitStatusController,
} = require('./visit.controller');
const {
  createVisitSchema,
  updateVisitSchema,
  idParamSchema,
  patientParamSchema,
  statusUpdateSchema,
} = require('./visit.validation');

const router = express.Router();

router.use(authMiddleware);

router.get('/', requirePermission('VIEW_VISITS'), getVisits);
router.post('/', requirePermission('CREATE_VISITS'), validate(createVisitSchema), auditMiddleware('CREATE', 'visits'), createVisitController);
router.get('/:id', requirePermission('VIEW_VISITS'), validate(idParamSchema), getVisitById);
router.get('/patient/:patientId', requirePermission('VIEW_VISITS'), validate(patientParamSchema), getVisitsByPatient);
router.put('/:id', requirePermission('CREATE_VISITS'), validate(updateVisitSchema), auditMiddleware('UPDATE', 'visits'), updateVisitController);
router.patch('/:id/status', requirePermission('CREATE_VISITS'), validate(statusUpdateSchema), auditMiddleware('STATUS_UPDATE', 'visits'), updateVisitStatusController);

module.exports = { visitRoutes: router };

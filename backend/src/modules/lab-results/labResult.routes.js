const express = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { requirePermission } = require('../../middlewares/permission.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const { auditMiddleware } = require('../../middlewares/audit.middleware');
const { uploadLabReport } = require('../../middlewares/upload.middleware');
const {
  createLabResultController,
  getLabResultById,
  getLabResultsByPatient,
  getLabResultsByVisit,
  updateLabResultController,
  uploadLabReportController,
} = require('./labResult.controller');
const {
  createLabResultSchema,
  updateLabResultSchema,
  idParamSchema,
  patientParamSchema,
  visitParamSchema,
} = require('./labResult.validation');

const router = express.Router();

router.use(authMiddleware);

router.post('/', requirePermission('ADD_LAB_RESULTS'), validate(createLabResultSchema), auditMiddleware('CREATE', 'lab-results'), createLabResultController);
router.get('/:id', requirePermission('VIEW_LAB_RESULTS'), validate(idParamSchema), getLabResultById);
router.get('/patient/:patientId', requirePermission('VIEW_LAB_RESULTS'), validate(patientParamSchema), getLabResultsByPatient);
router.get('/visit/:visitId', requirePermission('VIEW_LAB_RESULTS'), validate(visitParamSchema), getLabResultsByVisit);
router.put('/:id', requirePermission('ADD_LAB_RESULTS'), validate(updateLabResultSchema), auditMiddleware('UPDATE', 'lab-results'), updateLabResultController);
router.post('/upload', requirePermission('ADD_LAB_RESULTS'), uploadLabReport, uploadLabReportController);

module.exports = { labResultRoutes: router };

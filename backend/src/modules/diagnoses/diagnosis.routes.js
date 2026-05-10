const express = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { requirePermission } = require('../../middlewares/permission.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const { auditMiddleware } = require('../../middlewares/audit.middleware');
const {
  createDiagnosisController,
  getDiagnosisById,
  getDiagnosesByPatient,
  getDiagnosisByVisit,
  updateDiagnosisController,
} = require('./diagnosis.controller');
const {
  createDiagnosisSchema,
  updateDiagnosisSchema,
  idParamSchema,
  patientParamSchema,
  visitParamSchema,
} = require('./diagnosis.validation');

const router = express.Router();

router.use(authMiddleware);

router.post('/', requirePermission('ADD_DIAGNOSIS'), validate(createDiagnosisSchema), auditMiddleware('CREATE', 'diagnoses'), createDiagnosisController);
router.get('/:id', requirePermission('VIEW_DIAGNOSIS'), validate(idParamSchema), getDiagnosisById);
router.get('/patient/:patientId', requirePermission('VIEW_DIAGNOSIS'), validate(patientParamSchema), getDiagnosesByPatient);
router.get('/visit/:visitId', requirePermission('VIEW_DIAGNOSIS'), validate(visitParamSchema), getDiagnosisByVisit);
router.put('/:id', requirePermission('ADD_DIAGNOSIS'), validate(updateDiagnosisSchema), auditMiddleware('UPDATE', 'diagnoses'), updateDiagnosisController);

module.exports = { diagnosisRoutes: router };

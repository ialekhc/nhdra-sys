const express = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { requirePermission } = require('../../middlewares/permission.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const { auditMiddleware } = require('../../middlewares/audit.middleware');
const {
  createClinicalRecordController,
  getClinicalRecordById,
  getClinicalRecordsByPatient,
  getClinicalRecordByVisit,
  updateClinicalRecordController,
} = require('./clinicalRecord.controller');
const {
  createClinicalRecordSchema,
  updateClinicalRecordSchema,
  idParamSchema,
  patientParamSchema,
  visitParamSchema,
} = require('./clinicalRecord.validation');

const router = express.Router();

router.use(authMiddleware);

router.post('/', requirePermission('ADD_CLINICAL_RECORDS'), validate(createClinicalRecordSchema), auditMiddleware('CREATE', 'clinical-records'), createClinicalRecordController);
router.get('/:id', requirePermission('VIEW_CLINICAL_RECORDS'), validate(idParamSchema), getClinicalRecordById);
router.get('/patient/:patientId', requirePermission('VIEW_CLINICAL_RECORDS'), validate(patientParamSchema), getClinicalRecordsByPatient);
router.get('/visit/:visitId', requirePermission('VIEW_CLINICAL_RECORDS'), validate(visitParamSchema), getClinicalRecordByVisit);
router.put('/:id', requirePermission('ADD_CLINICAL_RECORDS'), validate(updateClinicalRecordSchema), auditMiddleware('UPDATE', 'clinical-records'), updateClinicalRecordController);

module.exports = { clinicalRecordRoutes: router };

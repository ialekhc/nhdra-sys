const express = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const { requirePermission } = require('../../middlewares/permission.middleware');
const { auditMiddleware } = require('../../middlewares/audit.middleware');
const {
  getPatients,
  createPatient,
  getPatientById,
  updatePatient,
  archivePatient,
  deletePatient,
  searchPatients,
} = require('./patient.controller');
const {
  createPatientSchema,
  updatePatientSchema,
  idParamSchema,
  searchPatientSchema,
} = require('./patient.validation');

const router = express.Router();

router.use(authMiddleware);

router.get('/', requirePermission('VIEW_PATIENTS'), getPatients);
router.post('/', requirePermission('CREATE_PATIENTS'), validate(createPatientSchema), auditMiddleware('CREATE', 'patients'), createPatient);
router.get('/search', requirePermission('VIEW_PATIENTS'), validate(searchPatientSchema), searchPatients);
router.get('/:id', requirePermission('VIEW_PATIENTS'), validate(idParamSchema), getPatientById);
router.put('/:id', requirePermission('UPDATE_PATIENTS'), validate(updatePatientSchema), auditMiddleware('UPDATE', 'patients'), updatePatient);
router.patch('/:id/archive', requirePermission('ARCHIVE_PATIENTS'), validate(idParamSchema), auditMiddleware('ARCHIVE', 'patients'), archivePatient);
router.delete('/:id', requirePermission('DELETE_PATIENTS'), validate(idParamSchema), auditMiddleware('DELETE', 'patients'), deletePatient);

module.exports = { patientRoutes: router };

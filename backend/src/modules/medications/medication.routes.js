const express = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { requirePermission } = require('../../middlewares/permission.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const { auditMiddleware } = require('../../middlewares/audit.middleware');
const {
  createMedicationController,
  getMedicationsByPatient,
  getMedicationsByVisit,
  updateMedicationController,
  deleteMedicationController,
} = require('./medication.controller');
const {
  createMedicationSchema,
  updateMedicationSchema,
  patientParamSchema,
  visitParamSchema,
  idParamSchema,
} = require('./medication.validation');

const router = express.Router();

router.use(authMiddleware);

router.post('/', requirePermission('ADD_DIAGNOSIS'), validate(createMedicationSchema), auditMiddleware('CREATE', 'medications'), createMedicationController);
router.get('/patient/:patientId', requirePermission('VIEW_DIAGNOSIS'), validate(patientParamSchema), getMedicationsByPatient);
router.get('/visit/:visitId', requirePermission('VIEW_DIAGNOSIS'), validate(visitParamSchema), getMedicationsByVisit);
router.put('/:id', requirePermission('ADD_DIAGNOSIS'), validate(updateMedicationSchema), auditMiddleware('UPDATE', 'medications'), updateMedicationController);
router.delete('/:id', requirePermission('ADD_DIAGNOSIS'), validate(idParamSchema), auditMiddleware('DELETE', 'medications'), deleteMedicationController);

module.exports = { medicationRoutes: router };

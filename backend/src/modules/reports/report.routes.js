const express = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { allowRoles } = require('../../middlewares/role.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const { auditMiddleware } = require('../../middlewares/audit.middleware');
const { ROLES } = require('../../constants/roles');
const {
  getMonthlyReport,
  getPatientSummaryReport,
  getFollowUpReport,
  getHighRiskPatientsReport,
  savePatientSummarySnapshot,
  getLatestPatientSummarySnapshot,
} = require('./report.controller');
const { patientSummaryQuerySchema, patientIdParamSchema } = require('./report.validation');

const router = express.Router();

router.use(authMiddleware);

router.get('/monthly', allowRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR), getMonthlyReport);
router.get(
  '/patient-summary',
  allowRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR, ROLES.STAFF),
  validate(patientSummaryQuerySchema),
  getPatientSummaryReport
);
router.post(
  '/patient-summary/:patientId/print',
  allowRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR, ROLES.STAFF),
  validate(patientIdParamSchema),
  auditMiddleware('PRINT', 'reports'),
  savePatientSummarySnapshot
);
router.get(
  '/patient-summary/:patientId/latest',
  allowRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR, ROLES.STAFF),
  validate(patientIdParamSchema),
  getLatestPatientSummarySnapshot
);
router.get('/follow-up', allowRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR), getFollowUpReport);
router.get('/high-risk-patients', allowRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.DOCTOR), getHighRiskPatientsReport);

module.exports = { reportRoutes: router };

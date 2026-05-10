const express = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { allowRoles } = require('../../middlewares/role.middleware');
const { ROLES } = require('../../constants/roles');
const {
  getSummary,
  getPatientTrends,
  getDiseaseDistribution,
  getRiskDistribution,
  getFollowUpSummary,
} = require('./dashboard.controller');

const router = express.Router();

router.use(authMiddleware);
router.use(allowRoles(...Object.values(ROLES)));

router.get('/summary', getSummary);
router.get('/patient-trends', getPatientTrends);
router.get('/disease-distribution', getDiseaseDistribution);
router.get('/risk-distribution', getRiskDistribution);
router.get('/follow-up-summary', getFollowUpSummary);

module.exports = { dashboardRoutes: router };

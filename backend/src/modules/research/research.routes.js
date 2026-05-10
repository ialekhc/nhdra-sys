const express = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { requirePermission } = require('../../middlewares/permission.middleware');
const { auditMiddleware } = require('../../middlewares/audit.middleware');
const {
  getDataset,
  exportExcelController,
  exportCsvController,
  getMissingDataReport,
} = require('./research.controller');

const router = express.Router();

router.use(authMiddleware);

router.get('/dataset', requirePermission('VIEW_RESEARCH_DATA'), getDataset);
router.get('/export-excel', requirePermission('EXPORT_RESEARCH_DATA'), auditMiddleware('EXPORT_EXCEL', 'research'), exportExcelController);
router.get('/export-csv', requirePermission('EXPORT_RESEARCH_DATA'), auditMiddleware('EXPORT_CSV', 'research'), exportCsvController);
router.get('/missing-data-report', requirePermission('VIEW_RESEARCH_DATA'), getMissingDataReport);

module.exports = { researchRoutes: router };

const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const {
  getDatasetService,
  exportExcelService,
  exportCsvService,
  missingDataReportService,
} = require('./research.service');

const getDataset = asyncHandler(async (req, res) => {
  const rows = await getDatasetService(req.query);
  res.status(200).json(new ApiResponse(200, 'Research dataset fetched successfully', rows));
});

const exportExcelController = asyncHandler(async (req, res) => {
  const fileBuffer = await exportExcelService(req.query);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="research-dataset-${Date.now()}.xlsx"`);
  res.status(200).send(fileBuffer);
});

const exportCsvController = asyncHandler(async (req, res) => {
  const csv = await exportCsvService(req.query);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="research-dataset-${Date.now()}.csv"`);
  res.status(200).send(csv);
});

const getMissingDataReport = asyncHandler(async (req, res) => {
  const report = await missingDataReportService(req.query);
  res.status(200).json(new ApiResponse(200, 'Missing data report fetched successfully', report));
});

module.exports = {
  getDataset,
  exportExcelController,
  exportCsvController,
  getMissingDataReport,
};

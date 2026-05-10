const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const {
  getMonthlyReportService,
  getPatientSummaryService,
  getFollowUpReportService,
  getHighRiskPatientsService,
  savePatientSummarySnapshotService,
  getLatestPatientSummarySnapshotService,
} = require('./report.service');

const getMonthlyReport = asyncHandler(async (req, res) => {
  const report = await getMonthlyReportService();
  res.status(200).json(new ApiResponse(200, 'Monthly report fetched successfully', report));
});

const getPatientSummaryReport = asyncHandler(async (req, res) => {
  const report = await getPatientSummaryService(req.query.patientId);
  res.status(200).json(new ApiResponse(200, 'Patient summary report fetched successfully', report));
});

const getFollowUpReport = asyncHandler(async (req, res) => {
  const report = await getFollowUpReportService();
  res.status(200).json(new ApiResponse(200, 'Follow-up report fetched successfully', report));
});

const getHighRiskPatientsReport = asyncHandler(async (req, res) => {
  const report = await getHighRiskPatientsService();
  res.status(200).json(new ApiResponse(200, 'High-risk patient report fetched successfully', report));
});

const savePatientSummarySnapshot = asyncHandler(async (req, res) => {
  const snapshot = await savePatientSummarySnapshotService(req.params.patientId, req.user);
  res.status(201).json(new ApiResponse(201, 'Patient report saved successfully', snapshot));
});

const getLatestPatientSummarySnapshot = asyncHandler(async (req, res) => {
  const snapshot = await getLatestPatientSummarySnapshotService(req.params.patientId);
  res.status(200).json(new ApiResponse(200, 'Latest saved patient report fetched successfully', snapshot));
});

module.exports = {
  getMonthlyReport,
  getPatientSummaryReport,
  getFollowUpReport,
  getHighRiskPatientsReport,
  savePatientSummarySnapshot,
  getLatestPatientSummarySnapshot,
};

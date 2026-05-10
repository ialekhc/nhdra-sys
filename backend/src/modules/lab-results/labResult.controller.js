const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const {
  createLabResultService,
  getLabResultByIdService,
  getLabResultsByPatientService,
  getLabResultsByVisitService,
  updateLabResultService,
  uploadLabReportService,
} = require('./labResult.service');

const createLabResultController = asyncHandler(async (req, res) => {
  const record = await createLabResultService(req.body, req.user.id);
  res.status(201).json(new ApiResponse(201, 'Lab result created successfully', record));
});

const getLabResultById = asyncHandler(async (req, res) => {
  const record = await getLabResultByIdService(req.params.id);
  res.status(200).json(new ApiResponse(200, 'Lab result fetched successfully', record));
});

const getLabResultsByPatient = asyncHandler(async (req, res) => {
  const records = await getLabResultsByPatientService(req.params.patientId);
  res.status(200).json(new ApiResponse(200, 'Lab results fetched successfully', records));
});

const getLabResultsByVisit = asyncHandler(async (req, res) => {
  const records = await getLabResultsByVisitService(req.params.visitId);
  res.status(200).json(new ApiResponse(200, 'Lab results fetched successfully', records));
});

const updateLabResultController = asyncHandler(async (req, res) => {
  const record = await updateLabResultService(req.params.id, req.body, req.user.id);
  res.status(200).json(new ApiResponse(200, 'Lab result updated successfully', record));
});

const uploadLabReportController = asyncHandler(async (req, res) => {
  const fileUrl = await uploadLabReportService(req.file);
  res.status(200).json(new ApiResponse(200, 'Lab report uploaded successfully', { fileUrl }));
});

module.exports = {
  createLabResultController,
  getLabResultById,
  getLabResultsByPatient,
  getLabResultsByVisit,
  updateLabResultController,
  uploadLabReportController,
};

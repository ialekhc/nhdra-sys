const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const {
  createClinicalRecordService,
  getClinicalRecordByIdService,
  getClinicalRecordsByPatientService,
  getClinicalRecordByVisitService,
  updateClinicalRecordService,
} = require('./clinicalRecord.service');

const createClinicalRecordController = asyncHandler(async (req, res) => {
  const record = await createClinicalRecordService(req.body, req.user.id);
  res.status(201).json(new ApiResponse(201, 'Clinical record created successfully', record));
});

const getClinicalRecordById = asyncHandler(async (req, res) => {
  const record = await getClinicalRecordByIdService(req.params.id);
  res.status(200).json(new ApiResponse(200, 'Clinical record fetched successfully', record));
});

const getClinicalRecordsByPatient = asyncHandler(async (req, res) => {
  const records = await getClinicalRecordsByPatientService(req.params.patientId);
  res.status(200).json(new ApiResponse(200, 'Clinical records fetched successfully', records));
});

const getClinicalRecordByVisit = asyncHandler(async (req, res) => {
  const record = await getClinicalRecordByVisitService(req.params.visitId);
  res.status(200).json(new ApiResponse(200, 'Clinical record fetched successfully', record));
});

const updateClinicalRecordController = asyncHandler(async (req, res) => {
  const record = await updateClinicalRecordService(req.params.id, req.body, req.user.id);
  res.status(200).json(new ApiResponse(200, 'Clinical record updated successfully', record));
});

module.exports = {
  createClinicalRecordController,
  getClinicalRecordById,
  getClinicalRecordsByPatient,
  getClinicalRecordByVisit,
  updateClinicalRecordController,
};

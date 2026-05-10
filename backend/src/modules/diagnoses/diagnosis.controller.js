const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const {
  createDiagnosisService,
  getDiagnosisByIdService,
  getDiagnosesByPatientService,
  getDiagnosisByVisitService,
  updateDiagnosisService,
} = require('./diagnosis.service');

const createDiagnosisController = asyncHandler(async (req, res) => {
  const diagnosis = await createDiagnosisService(req.body, req.user.id);
  res.status(201).json(new ApiResponse(201, 'Diagnosis created successfully', diagnosis));
});

const getDiagnosisById = asyncHandler(async (req, res) => {
  const diagnosis = await getDiagnosisByIdService(req.params.id);
  res.status(200).json(new ApiResponse(200, 'Diagnosis fetched successfully', diagnosis));
});

const getDiagnosesByPatient = asyncHandler(async (req, res) => {
  const diagnoses = await getDiagnosesByPatientService(req.params.patientId);
  res.status(200).json(new ApiResponse(200, 'Diagnoses fetched successfully', diagnoses));
});

const getDiagnosisByVisit = asyncHandler(async (req, res) => {
  const diagnosis = await getDiagnosisByVisitService(req.params.visitId);
  res.status(200).json(new ApiResponse(200, 'Diagnosis fetched successfully', diagnosis));
});

const updateDiagnosisController = asyncHandler(async (req, res) => {
  const diagnosis = await updateDiagnosisService(req.params.id, req.body, req.user.id);
  res.status(200).json(new ApiResponse(200, 'Diagnosis updated successfully', diagnosis));
});

module.exports = {
  createDiagnosisController,
  getDiagnosisById,
  getDiagnosesByPatient,
  getDiagnosisByVisit,
  updateDiagnosisController,
};

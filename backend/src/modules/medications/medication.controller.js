const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const {
  createMedicationService,
  getMedicationsByPatientService,
  getMedicationsByVisitService,
  updateMedicationService,
  deleteMedicationService,
} = require('./medication.service');

const createMedicationController = asyncHandler(async (req, res) => {
  const medication = await createMedicationService(req.body, req.user.id);
  res.status(201).json(new ApiResponse(201, 'Medication created successfully', medication));
});

const getMedicationsByPatient = asyncHandler(async (req, res) => {
  const medications = await getMedicationsByPatientService(req.params.patientId);
  res.status(200).json(new ApiResponse(200, 'Medications fetched successfully', medications));
});

const getMedicationsByVisit = asyncHandler(async (req, res) => {
  const medications = await getMedicationsByVisitService(req.params.visitId);
  res.status(200).json(new ApiResponse(200, 'Medications fetched successfully', medications));
});

const updateMedicationController = asyncHandler(async (req, res) => {
  const medication = await updateMedicationService(req.params.id, req.body, req.user.id);
  res.status(200).json(new ApiResponse(200, 'Medication updated successfully', medication));
});

const deleteMedicationController = asyncHandler(async (req, res) => {
  await deleteMedicationService(req.params.id);
  res.status(200).json(new ApiResponse(200, 'Medication deleted successfully', null));
});

module.exports = {
  createMedicationController,
  getMedicationsByPatient,
  getMedicationsByVisit,
  updateMedicationController,
  deleteMedicationController,
};

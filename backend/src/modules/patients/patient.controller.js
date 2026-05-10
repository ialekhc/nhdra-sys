const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const {
  getPatientsService,
  createPatientService,
  getPatientByIdService,
  updatePatientService,
  archivePatientService,
  hardDeletePatientService,
  searchPatientsService,
} = require('./patient.service');

const getPatients = asyncHandler(async (req, res) => {
  const { patients, meta } = await getPatientsService(req.query);
  res.status(200).json(new ApiResponse(200, 'Patients fetched successfully', patients, meta));
});

const createPatient = asyncHandler(async (req, res) => {
  const patient = await createPatientService(req.body, req.user.id);
  res.status(201).json(new ApiResponse(201, 'Patient created successfully', patient));
});

const getPatientById = asyncHandler(async (req, res) => {
  const patient = await getPatientByIdService(req.params.id);
  res.status(200).json(new ApiResponse(200, 'Patient fetched successfully', patient));
});

const updatePatient = asyncHandler(async (req, res) => {
  const patient = await updatePatientService(req.params.id, req.body, req.user.id);
  res.status(200).json(new ApiResponse(200, 'Patient updated successfully', patient));
});

const archivePatient = asyncHandler(async (req, res) => {
  const patient = await archivePatientService(req.params.id, req.user.id);
  res.status(200).json(new ApiResponse(200, 'Patient archived successfully', patient));
});

const deletePatient = asyncHandler(async (req, res) => {
  await hardDeletePatientService(req.params.id, req.user.role);
  res.status(200).json(new ApiResponse(200, 'Patient deleted successfully', null));
});

const searchPatients = asyncHandler(async (req, res) => {
  const records = await searchPatientsService(req.query.query || '');
  res.status(200).json(new ApiResponse(200, 'Patient search results fetched', records));
});

module.exports = {
  getPatients,
  createPatient,
  getPatientById,
  updatePatient,
  archivePatient,
  deletePatient,
  searchPatients,
};

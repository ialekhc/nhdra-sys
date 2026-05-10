const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const {
  getVisitsService,
  createVisitService,
  getVisitByIdService,
  getPatientVisitsService,
  updateVisitService,
  updateVisitStatusService,
} = require('./visit.service');

const getVisits = asyncHandler(async (req, res) => {
  const { visits, meta } = await getVisitsService(req.query);
  res.status(200).json(new ApiResponse(200, 'Visits fetched successfully', visits, meta));
});

const createVisitController = asyncHandler(async (req, res) => {
  const visit = await createVisitService(req.body, req.user.id);
  res.status(201).json(new ApiResponse(201, 'Visit created successfully', visit));
});

const getVisitById = asyncHandler(async (req, res) => {
  const visit = await getVisitByIdService(req.params.id);
  res.status(200).json(new ApiResponse(200, 'Visit fetched successfully', visit));
});

const getVisitsByPatient = asyncHandler(async (req, res) => {
  const visits = await getPatientVisitsService(req.params.patientId);
  res.status(200).json(new ApiResponse(200, 'Patient visits fetched successfully', visits));
});

const updateVisitController = asyncHandler(async (req, res) => {
  const visit = await updateVisitService(req.params.id, req.body, req.user.id);
  res.status(200).json(new ApiResponse(200, 'Visit updated successfully', visit));
});

const updateVisitStatusController = asyncHandler(async (req, res) => {
  const visit = await updateVisitStatusService(req.params.id, req.body.status, req.user.id);
  res.status(200).json(new ApiResponse(200, 'Visit status updated successfully', visit));
});

module.exports = {
  getVisits,
  createVisitController,
  getVisitById,
  getVisitsByPatient,
  updateVisitController,
  updateVisitStatusController,
};

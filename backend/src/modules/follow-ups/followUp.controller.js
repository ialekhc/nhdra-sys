const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const {
  getFollowUpsService,
  createFollowUpService,
  getTodayFollowUpsService,
  getMissedFollowUpsService,
  getFollowUpsByPatientService,
  updateFollowUpService,
  updateFollowUpStatusService,
} = require('./followUp.service');

const getFollowUps = asyncHandler(async (req, res) => {
  const { followUps, meta } = await getFollowUpsService(req.query);
  res.status(200).json(new ApiResponse(200, 'Follow-ups fetched successfully', followUps, meta));
});

const createFollowUpController = asyncHandler(async (req, res) => {
  const followUp = await createFollowUpService(req.body, req.user.id);
  res.status(201).json(new ApiResponse(201, 'Follow-up created successfully', followUp));
});

const getTodayFollowUps = asyncHandler(async (req, res) => {
  const followUps = await getTodayFollowUpsService();
  res.status(200).json(new ApiResponse(200, 'Today follow-ups fetched successfully', followUps));
});

const getMissedFollowUps = asyncHandler(async (req, res) => {
  const followUps = await getMissedFollowUpsService();
  res.status(200).json(new ApiResponse(200, 'Missed follow-ups fetched successfully', followUps));
});

const getFollowUpsByPatient = asyncHandler(async (req, res) => {
  const followUps = await getFollowUpsByPatientService(req.params.patientId);
  res.status(200).json(new ApiResponse(200, 'Patient follow-ups fetched successfully', followUps));
});

const updateFollowUpController = asyncHandler(async (req, res) => {
  const followUp = await updateFollowUpService(req.params.id, req.body, req.user.id);
  res.status(200).json(new ApiResponse(200, 'Follow-up updated successfully', followUp));
});

const updateFollowUpStatusController = asyncHandler(async (req, res) => {
  const followUp = await updateFollowUpStatusService(req.params.id, req.body.status, req.user.id);
  res.status(200).json(new ApiResponse(200, 'Follow-up status updated successfully', followUp));
});

module.exports = {
  getFollowUps,
  createFollowUpController,
  getTodayFollowUps,
  getMissedFollowUps,
  getFollowUpsByPatient,
  updateFollowUpController,
  updateFollowUpStatusController,
};

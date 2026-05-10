const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const {
  getRoleSpecificSummary,
  monthlyTrend,
  diseaseDistribution,
  riskDistribution,
  followUpSummary,
} = require('./dashboard.service');

const getSummary = asyncHandler(async (req, res) => {
  const summary = await getRoleSpecificSummary(req.user.role);
  res.status(200).json(new ApiResponse(200, 'Dashboard summary fetched successfully', summary));
});

const getPatientTrends = asyncHandler(async (req, res) => {
  const trends = await monthlyTrend();
  res.status(200).json(new ApiResponse(200, 'Patient trends fetched successfully', trends));
});

const getDiseaseDistribution = asyncHandler(async (req, res) => {
  const distribution = await diseaseDistribution();
  res.status(200).json(new ApiResponse(200, 'Disease distribution fetched successfully', distribution));
});

const getRiskDistribution = asyncHandler(async (req, res) => {
  const distribution = await riskDistribution();
  res.status(200).json(new ApiResponse(200, 'Risk distribution fetched successfully', distribution));
});

const getFollowUpSummary = asyncHandler(async (req, res) => {
  const summary = await followUpSummary();
  res.status(200).json(new ApiResponse(200, 'Follow-up summary fetched successfully', summary));
});

module.exports = {
  getSummary,
  getPatientTrends,
  getDiseaseDistribution,
  getRiskDistribution,
  getFollowUpSummary,
};

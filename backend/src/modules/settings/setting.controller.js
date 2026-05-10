const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { getSettingsService, updateSettingService } = require('./setting.service');

const getAllSettings = asyncHandler(async (req, res) => {
  const settings = await getSettingsService();
  res.status(200).json(new ApiResponse(200, 'Settings fetched successfully', settings));
});

const updateSetting = asyncHandler(async (req, res) => {
  const setting = await updateSettingService(req.params.key, req.body.value, req.user.id);
  res.status(200).json(new ApiResponse(200, 'Setting updated successfully', setting));
});

module.exports = {
  getAllSettings,
  updateSetting,
};

const { getSettings, upsertSetting } = require('./setting.repository');

const getSettingsService = async () => getSettings();

const updateSettingService = async (key, value, actorId) => {
  return upsertSetting(key, {
    key,
    value,
    updatedBy: actorId,
    createdBy: actorId,
  });
};

module.exports = {
  getSettingsService,
  updateSettingService,
};

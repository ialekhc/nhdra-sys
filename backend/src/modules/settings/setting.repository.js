const { Setting } = require('./setting.model');

const getSettings = () => Setting.find({}).sort({ key: 1 });

const findSettingByKey = (key) => Setting.findOne({ key });

const upsertSetting = (key, payload) =>
  Setting.findOneAndUpdate({ key }, payload, {
    new: true,
    upsert: true,
    runValidators: true,
  });

module.exports = {
  getSettings,
  findSettingByKey,
  upsertSetting,
};

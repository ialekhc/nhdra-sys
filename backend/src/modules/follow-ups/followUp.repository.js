const { FollowUp } = require('./followUp.model');

const createFollowUp = (payload) => FollowUp.create(payload);

const listFollowUps = async (filter, options = {}) => {
  const query = FollowUp.find(filter)
    .populate('patient', 'patientId fullName age gender phone')
    .populate('visit', 'visitId visitDate visitType')
    .sort({ followUpDate: 1 });

  if (options.skip !== undefined) query.skip(options.skip);
  if (options.limit !== undefined) query.limit(options.limit);

  const [items, total] = await Promise.all([query, FollowUp.countDocuments(filter)]);
  return { items, total };
};

const findFollowUpById = (id) =>
  FollowUp.findById(id)
    .populate('patient', 'patientId fullName age gender')
    .populate('visit', 'visitId visitDate visitType');

const findFollowUpsByPatient = (patientId) =>
  FollowUp.find({ patient: patientId }).sort({ followUpDate: -1 }).populate('visit', 'visitId visitDate');

const findFollowUpByPatientAndVisit = (patientId, visitId) => FollowUp.findOne({ patient: patientId, visit: visitId });

const updateFollowUpById = (id, payload) => FollowUp.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

module.exports = {
  createFollowUp,
  listFollowUps,
  findFollowUpById,
  findFollowUpsByPatient,
  findFollowUpByPatientAndVisit,
  updateFollowUpById,
};

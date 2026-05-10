const { Visit } = require('./visit.model');

const listVisits = async (filter, options) => {
  const [items, total] = await Promise.all([
    Visit.find(filter)
      .populate('patient', 'patientId fullName gender age phone status')
      .populate('assignedDoctor', 'name email role')
      .sort({ visitDate: -1 })
      .skip(options.skip)
      .limit(options.limit),
    Visit.countDocuments(filter),
  ]);

  return { items, total };
};

const countVisits = () => Visit.countDocuments({});

const createVisit = (payload) => Visit.create(payload);

const findVisitById = (id) =>
  Visit.findById(id).populate('patient', 'patientId fullName age gender phone').populate('assignedDoctor', 'name email');

const listVisitsByPatient = (patientId) =>
  Visit.find({ patient: patientId }).sort({ visitDate: -1 }).populate('assignedDoctor', 'name email');

const updateVisitById = (id, payload) => Visit.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

module.exports = {
  listVisits,
  countVisits,
  createVisit,
  findVisitById,
  listVisitsByPatient,
  updateVisitById,
};

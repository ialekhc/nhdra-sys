const { LabResult } = require('./labResult.model');

const createLabResult = (payload) => LabResult.create(payload);

const findLabResultById = (id) =>
  LabResult.findById(id)
    .populate('patient', 'patientId fullName age gender')
    .populate('visit', 'visitId visitDate visitType');

const findLabResultsByPatient = (patientId) =>
  LabResult.find({ patient: patientId })
    .sort({ testDate: -1 })
    .populate('visit', 'visitId visitDate visitType');

const findLabResultsByVisit = (visitId) => LabResult.find({ visit: visitId }).sort({ testDate: -1 });

const updateLabResultById = (id, payload) => LabResult.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

module.exports = {
  createLabResult,
  findLabResultById,
  findLabResultsByPatient,
  findLabResultsByVisit,
  updateLabResultById,
};

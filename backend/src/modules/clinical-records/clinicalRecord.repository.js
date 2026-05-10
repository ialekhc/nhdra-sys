const { ClinicalRecord } = require('./clinicalRecord.model');

const createClinicalRecord = (payload) => ClinicalRecord.create(payload);

const findClinicalRecordById = (id) =>
  ClinicalRecord.findById(id)
    .populate('patient', 'patientId fullName age gender')
    .populate('visit', 'visitId visitDate visitType');

const findByPatient = (patientId) =>
  ClinicalRecord.find({ patient: patientId })
    .sort({ createdAt: -1 })
    .populate('visit', 'visitId visitDate visitType');

const findByVisit = (visitId) => ClinicalRecord.findOne({ visit: visitId }).populate('patient', 'patientId fullName');

const updateClinicalRecordById = (id, payload) =>
  ClinicalRecord.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

module.exports = {
  createClinicalRecord,
  findClinicalRecordById,
  findByPatient,
  findByVisit,
  updateClinicalRecordById,
};

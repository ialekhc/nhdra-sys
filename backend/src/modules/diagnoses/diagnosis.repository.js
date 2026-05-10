const { Diagnosis } = require('./diagnosis.model');

const createDiagnosis = (payload) => Diagnosis.create(payload);

const findDiagnosisById = (id) =>
  Diagnosis.findById(id)
    .populate('patient', 'patientId fullName age gender')
    .populate('visit', 'visitId visitDate visitType')
    .populate('doctor', 'name email');

const findDiagnosesByPatient = (patientId) =>
  Diagnosis.find({ patient: patientId })
    .sort({ createdAt: -1 })
    .populate('visit', 'visitId visitDate visitType')
    .populate('doctor', 'name email');

const findDiagnosisByVisit = (visitId) => Diagnosis.findOne({ visit: visitId }).populate('doctor', 'name email');

const updateDiagnosisById = (id, payload) => Diagnosis.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

module.exports = {
  createDiagnosis,
  findDiagnosisById,
  findDiagnosesByPatient,
  findDiagnosisByVisit,
  updateDiagnosisById,
};

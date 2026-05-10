const { Medication } = require('./medication.model');

const createMedication = (payload) => Medication.create(payload);

const findMedicationById = (id) =>
  Medication.findById(id)
    .populate('patient', 'patientId fullName')
    .populate('visit', 'visitId visitDate')
    .populate('prescribedBy', 'name email');

const findMedicationsByPatient = (patientId) =>
  Medication.find({ patient: patientId }).sort({ createdAt: -1 }).populate('prescribedBy', 'name email');

const findMedicationsByVisit = (visitId) =>
  Medication.find({ visit: visitId }).sort({ createdAt: -1 }).populate('prescribedBy', 'name email');

const updateMedicationById = (id, payload) => Medication.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

const deleteMedicationById = (id) => Medication.findByIdAndDelete(id);

module.exports = {
  createMedication,
  findMedicationById,
  findMedicationsByPatient,
  findMedicationsByVisit,
  updateMedicationById,
  deleteMedicationById,
};

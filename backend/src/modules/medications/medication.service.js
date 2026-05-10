const ApiError = require('../../utils/ApiError');
const { Patient } = require('../patients/patient.model');
const { Visit } = require('../visits/visit.model');
const {
  createMedication,
  findMedicationById,
  findMedicationsByPatient,
  findMedicationsByVisit,
  updateMedicationById,
  deleteMedicationById,
} = require('./medication.repository');

const createMedicationService = async (payload, actorId) => {
  const [patient, visit] = await Promise.all([Patient.findById(payload.patient), Visit.findById(payload.visit)]);
  if (!patient) throw new ApiError(404, 'Patient not found');
  if (!visit) throw new ApiError(404, 'Visit not found');

  return createMedication({
    ...payload,
    prescribedBy: payload.prescribedBy || actorId,
    createdBy: actorId,
    updatedBy: actorId,
  });
};

const getMedicationsByPatientService = async (patientId) => findMedicationsByPatient(patientId);

const getMedicationsByVisitService = async (visitId) => findMedicationsByVisit(visitId);

const updateMedicationService = async (id, payload, actorId) => {
  const record = await findMedicationById(id);
  if (!record) throw new ApiError(404, 'Medication not found');

  return updateMedicationById(id, { ...payload, updatedBy: actorId });
};

const deleteMedicationService = async (id) => {
  const record = await findMedicationById(id);
  if (!record) throw new ApiError(404, 'Medication not found');

  await deleteMedicationById(id);
  return true;
};

module.exports = {
  createMedicationService,
  getMedicationsByPatientService,
  getMedicationsByVisitService,
  updateMedicationService,
  deleteMedicationService,
};

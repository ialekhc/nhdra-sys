const ApiError = require('../../utils/ApiError');
const { Patient } = require('../patients/patient.model');
const { Visit } = require('../visits/visit.model');
const {
  createDiagnosis,
  findDiagnosisById,
  findDiagnosesByPatient,
  findDiagnosisByVisit,
  updateDiagnosisById,
} = require('./diagnosis.repository');
const {
  findFollowUpByPatientAndVisit,
  createFollowUp,
  updateFollowUpById,
} = require('../follow-ups/followUp.repository');

const syncFollowUpFromDiagnosis = async (diagnosis, actorId) => {
  if (!diagnosis.nextFollowUpDate) return;

  const existingFollowUp = await findFollowUpByPatientAndVisit(diagnosis.patient, diagnosis.visit);

  if (existingFollowUp) {
    await updateFollowUpById(existingFollowUp._id, {
      followUpDate: diagnosis.nextFollowUpDate,
      status: existingFollowUp.status || 'Pending',
      updatedBy: actorId,
    });
    return;
  }

  await createFollowUp({
    patient: diagnosis.patient,
    visit: diagnosis.visit,
    followUpDate: diagnosis.nextFollowUpDate,
    status: 'Pending',
    createdBy: actorId,
    updatedBy: actorId,
  });
};

const createDiagnosisService = async (payload, actorId) => {
  const [patient, visit, existing] = await Promise.all([
    Patient.findById(payload.patient),
    Visit.findById(payload.visit),
    findDiagnosisByVisit(payload.visit),
  ]);

  if (!patient) throw new ApiError(404, 'Patient not found');
  if (!visit) throw new ApiError(404, 'Visit not found');
  if (existing) throw new ApiError(409, 'Diagnosis already exists for this visit');

  const diagnosis = await createDiagnosis({
    ...payload,
    doctor: payload.doctor || actorId,
    createdBy: actorId,
    updatedBy: actorId,
  });

  await syncFollowUpFromDiagnosis(diagnosis, actorId);

  return diagnosis;
};

const getDiagnosisByIdService = async (id) => {
  const diagnosis = await findDiagnosisById(id);
  if (!diagnosis) throw new ApiError(404, 'Diagnosis not found');
  return diagnosis;
};

const getDiagnosesByPatientService = async (patientId) => findDiagnosesByPatient(patientId);

const getDiagnosisByVisitService = async (visitId) => {
  const diagnosis = await findDiagnosisByVisit(visitId);
  if (!diagnosis) throw new ApiError(404, 'Diagnosis not found');
  return diagnosis;
};

const updateDiagnosisService = async (id, payload, actorId) => {
  const existing = await findDiagnosisById(id);
  if (!existing) throw new ApiError(404, 'Diagnosis not found');

  const diagnosis = await updateDiagnosisById(id, {
    ...payload,
    updatedBy: actorId,
  });

  await syncFollowUpFromDiagnosis(diagnosis, actorId);

  return diagnosis;
};

module.exports = {
  createDiagnosisService,
  getDiagnosisByIdService,
  getDiagnosesByPatientService,
  getDiagnosisByVisitService,
  updateDiagnosisService,
};

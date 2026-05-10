const ApiError = require('../../utils/ApiError');
const { calculateBMI } = require('../../utils/calculateBMI');
const { classifyBMI } = require('../../utils/classifyBMI');
const { classifyBP } = require('../../utils/classifyBP');
const { Patient } = require('../patients/patient.model');
const { Visit } = require('../visits/visit.model');
const {
  createClinicalRecord,
  findClinicalRecordById,
  findByPatient,
  findByVisit,
  updateClinicalRecordById,
} = require('./clinicalRecord.repository');

const enrichVitals = (payload) => {
  const bmi = calculateBMI(payload.heightCm, payload.weightKg);
  const bmiCategory = classifyBMI(bmi);
  const bpCategory = classifyBP(payload.systolicBP, payload.diastolicBP);

  return {
    ...payload,
    bmi,
    bmiCategory,
    bpCategory,
  };
};

const createClinicalRecordService = async (payload, actorId) => {
  const [patient, visit, existingRecord] = await Promise.all([
    Patient.findById(payload.patient),
    Visit.findById(payload.visit),
    findByVisit(payload.visit),
  ]);

  if (!patient) throw new ApiError(404, 'Patient not found');
  if (!visit) throw new ApiError(404, 'Visit not found');
  if (existingRecord) throw new ApiError(409, 'Clinical record already exists for this visit');

  return createClinicalRecord({
    ...enrichVitals(payload),
    createdBy: actorId,
    updatedBy: actorId,
  });
};

const getClinicalRecordByIdService = async (id) => {
  const record = await findClinicalRecordById(id);
  if (!record) throw new ApiError(404, 'Clinical record not found');
  return record;
};

const getClinicalRecordsByPatientService = async (patientId) => findByPatient(patientId);

const getClinicalRecordByVisitService = async (visitId) => {
  const record = await findByVisit(visitId);
  if (!record) throw new ApiError(404, 'Clinical record not found');
  return record;
};

const updateClinicalRecordService = async (id, payload, actorId) => {
  const existing = await findClinicalRecordById(id);
  if (!existing) throw new ApiError(404, 'Clinical record not found');

  return updateClinicalRecordById(id, {
    ...enrichVitals({ ...existing.toObject(), ...payload }),
    updatedBy: actorId,
  });
};

module.exports = {
  createClinicalRecordService,
  getClinicalRecordByIdService,
  getClinicalRecordsByPatientService,
  getClinicalRecordByVisitService,
  updateClinicalRecordService,
};

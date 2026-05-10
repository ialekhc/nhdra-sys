const path = require('path');
const ApiError = require('../../utils/ApiError');
const { Patient } = require('../patients/patient.model');
const { Visit } = require('../visits/visit.model');
const {
  createLabResult,
  findLabResultById,
  findLabResultsByPatient,
  findLabResultsByVisit,
  updateLabResultById,
} = require('./labResult.repository');

const ensurePatientVisit = async (patientId, visitId) => {
  const [patient, visit] = await Promise.all([Patient.findById(patientId), Visit.findById(visitId)]);
  if (!patient) throw new ApiError(404, 'Patient not found');
  if (!visit) throw new ApiError(404, 'Visit not found');
};

const createLabResultService = async (payload, actorId) => {
  await ensurePatientVisit(payload.patient, payload.visit);

  return createLabResult({
    ...payload,
    createdBy: actorId,
    updatedBy: actorId,
  });
};

const getLabResultByIdService = async (id) => {
  const record = await findLabResultById(id);
  if (!record) throw new ApiError(404, 'Lab result not found');
  return record;
};

const getLabResultsByPatientService = async (patientId) => findLabResultsByPatient(patientId);

const getLabResultsByVisitService = async (visitId) => findLabResultsByVisit(visitId);

const updateLabResultService = async (id, payload, actorId) => {
  const existing = await findLabResultById(id);
  if (!existing) throw new ApiError(404, 'Lab result not found');

  return updateLabResultById(id, { ...payload, updatedBy: actorId });
};

const uploadLabReportService = async (file) => {
  if (!file) throw new ApiError(400, 'Lab report file is required');
  const relativePath = path.join('uploads', 'lab-reports', file.filename);
  return `/${relativePath.replace(/\\/g, '/')}`;
};

module.exports = {
  createLabResultService,
  getLabResultByIdService,
  getLabResultsByPatientService,
  getLabResultsByVisitService,
  updateLabResultService,
  uploadLabReportService,
};

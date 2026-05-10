const { Patient } = require('../patients/patient.model');
const { Visit } = require('../visits/visit.model');
const { ClinicalRecord } = require('../clinical-records/clinicalRecord.model');
const { LabResult } = require('../lab-results/labResult.model');
const { Diagnosis } = require('../diagnoses/diagnosis.model');
const { Medication } = require('../medications/medication.model');
const { FollowUp } = require('../follow-ups/followUp.model');
const { PatientReportSnapshot } = require('./patientReportSnapshot.model');

const getPatientById = (patientId) => Patient.findById(patientId).lean();

const getVisitsByPatient = (patientId) =>
  Visit.find({ patient: patientId })
    .populate('assignedDoctor', 'name email role')
    .sort({ visitDate: -1 })
    .lean();

const getClinicalRecordsByPatient = (patientId) =>
  ClinicalRecord.find({ patient: patientId })
    .populate('visit', 'visitDate visitType status')
    .sort({ createdAt: -1 })
    .lean();

const getLabResultsByPatient = (patientId) =>
  LabResult.find({ patient: patientId })
    .populate('visit', 'visitDate visitType status')
    .sort({ testDate: -1 })
    .lean();

const getDiagnosesByPatient = (patientId) =>
  Diagnosis.find({ patient: patientId })
    .populate('visit', 'visitDate visitType status')
    .populate('doctor', 'name email role')
    .sort({ createdAt: -1 })
    .lean();

const getMedicationsByPatient = (patientId) =>
  Medication.find({ patient: patientId })
    .populate('visit', 'visitDate visitType status')
    .populate('prescribedBy', 'name email role')
    .sort({ createdAt: -1 })
    .lean();

const getFollowUpsByPatient = (patientId) =>
  FollowUp.find({ patient: patientId })
    .populate('visit', 'visitDate visitType status')
    .sort({ followUpDate: -1 })
    .lean();

const createPatientReportSnapshot = (payload) => PatientReportSnapshot.create(payload);

const getLatestPatientReportSnapshot = (patientId) =>
  PatientReportSnapshot.findOne({ patient: patientId }).sort({ generatedAt: -1 }).lean();

module.exports = {
  getPatientById,
  getVisitsByPatient,
  getClinicalRecordsByPatient,
  getLabResultsByPatient,
  getDiagnosesByPatient,
  getMedicationsByPatient,
  getFollowUpsByPatient,
  createPatientReportSnapshot,
  getLatestPatientReportSnapshot,
};

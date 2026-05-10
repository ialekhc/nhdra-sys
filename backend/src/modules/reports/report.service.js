const ApiError = require('../../utils/ApiError');
const { Visit } = require('../visits/visit.model');
const { FollowUp } = require('../follow-ups/followUp.model');
const { Diagnosis } = require('../diagnoses/diagnosis.model');
const {
  getPatientById,
  getVisitsByPatient,
  getClinicalRecordsByPatient,
  getLabResultsByPatient,
  getDiagnosesByPatient,
  getMedicationsByPatient,
  getFollowUpsByPatient,
  createPatientReportSnapshot,
  getLatestPatientReportSnapshot,
} = require('./report.repository');

const getMonthlyReportService = async () => {
  const monthly = await Visit.aggregate([
    {
      $group: {
        _id: {
          month: { $dateToString: { format: '%Y-%m', date: '$visitDate' } },
          type: '$visitType',
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.month': 1 } },
  ]);

  return monthly.map((item) => ({
    month: item._id.month,
    visitType: item._id.type,
    count: item.count,
  }));
};

const getPatientSummaryService = async (patientId) => {
  const patient = await getPatientById(patientId);
  if (!patient) throw new ApiError(404, 'Patient not found');

  const [visits, clinicalRecords, labResults, diagnoses, medications, followUps] = await Promise.all([
    getVisitsByPatient(patientId),
    getClinicalRecordsByPatient(patientId),
    getLabResultsByPatient(patientId),
    getDiagnosesByPatient(patientId),
    getMedicationsByPatient(patientId),
    getFollowUpsByPatient(patientId),
  ]);

  return {
    patient,
    visits,
    clinicalRecords,
    labResults,
    diagnoses,
    medications,
    followUps,
    meta: {
      generatedAt: new Date().toISOString(),
      totals: {
        visits: visits.length,
        clinicalRecords: clinicalRecords.length,
        labResults: labResults.length,
        diagnoses: diagnoses.length,
        medications: medications.length,
        followUps: followUps.length,
      },
      lastVisitDate: visits[0]?.visitDate || null,
      latestRiskLevel: diagnoses[0]?.riskLevel || null,
      nextFollowUpDate: followUps[0]?.followUpDate || null,
    },
  };
};

const getFollowUpReportService = async () => {
  const byStatus = await FollowUp.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  return byStatus.map((item) => ({ status: item._id, count: item.count }));
};

const getHighRiskPatientsService = async () => {
  const diagnoses = await Diagnosis.find({ riskLevel: { $in: ['High', 'Critical'] } })
    .populate('patient', 'patientId fullName age gender phone')
    .populate('visit', 'visitId visitDate visitType')
    .sort({ updatedAt: -1 });

  return diagnoses;
};

const savePatientSummarySnapshotService = async (patientId, actor) => {
  const report = await getPatientSummaryService(patientId);

  const snapshot = await createPatientReportSnapshot({
    patient: report.patient._id,
    patientId: report.patient.patientId,
    researchId: report.patient.researchId,
    reportType: 'OVERALL_PATIENT_REPORT',
    snapshot: report,
    generatedBy: actor.id,
    generatedByRole: actor.role,
    generatedAt: new Date(),
  });

  return {
    snapshotId: snapshot._id,
    savedAt: snapshot.generatedAt,
    report,
  };
};

const getLatestPatientSummarySnapshotService = async (patientId) => {
  const snapshot = await getLatestPatientReportSnapshot(patientId);
  if (!snapshot) {
    throw new ApiError(404, 'No saved patient report found');
  }

  return snapshot;
};

module.exports = {
  getMonthlyReportService,
  getPatientSummaryService,
  getFollowUpReportService,
  getHighRiskPatientsService,
  savePatientSummarySnapshotService,
  getLatestPatientSummarySnapshotService,
};

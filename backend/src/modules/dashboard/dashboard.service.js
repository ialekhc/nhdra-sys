const { Patient } = require('../patients/patient.model');
const { Visit } = require('../visits/visit.model');
const { ClinicalRecord } = require('../clinical-records/clinicalRecord.model');
const { Diagnosis } = require('../diagnoses/diagnosis.model');
const { FollowUp } = require('../follow-ups/followUp.model');

const startOfToday = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

const buildSummary = async () => {
  const today = startOfToday();

  const [
    totalPatients,
    newPatientsToday,
    visitsToday,
    followUpsToday,
    missedFollowUps,
    diabeticPatients,
    hypertensionPatients,
    cardiacPatients,
    highRiskPatients,
    researchConsentedPatients,
  ] = await Promise.all([
    Patient.countDocuments({ status: 'active' }),
    Patient.countDocuments({ createdAt: { $gte: today } }),
    Visit.countDocuments({ visitDate: { $gte: today } }),
    FollowUp.countDocuments({ followUpDate: { $gte: today } }),
    FollowUp.countDocuments({ followUpDate: { $lt: today }, status: { $in: ['Pending', 'Missed'] } }),
    ClinicalRecord.countDocuments({ diabetesStatus: { $in: ['Type 1', 'Type 2', 'Prediabetes', 'Gestational'] } }),
    ClinicalRecord.countDocuments({ hypertension: true }),
    ClinicalRecord.countDocuments({
      $or: [{ coronaryArteryDisease: true }, { heartFailure: true }, { strokeHistory: true }],
    }),
    Diagnosis.countDocuments({ riskLevel: { $in: ['High', 'Critical'] } }),
    Patient.countDocuments({ researchConsent: true }),
  ]);

  return {
    totalPatients,
    newPatientsToday,
    visitsToday,
    followUpsToday,
    missedFollowUps,
    diabeticPatients,
    hypertensionPatients,
    cardiacPatients,
    highRiskPatients,
    researchConsentedPatients,
  };
};

const monthlyTrend = async () => {
  const [patientTrend, visitTrend] = await Promise.all([
    Patient.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
    Visit.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$visitDate' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  return {
    patientTrend: patientTrend.map((item) => ({ month: item._id, count: item.count })),
    visitTrend: visitTrend.map((item) => ({ month: item._id, count: item.count })),
  };
};

const diseaseDistribution = async () => {
  const records = await ClinicalRecord.aggregate([
    {
      $group: {
        _id: null,
        diabetes: {
          $sum: {
            $cond: [{ $in: ['$diabetesStatus', ['Type 1', 'Type 2', 'Prediabetes', 'Gestational']] }, 1, 0],
          },
        },
        hypertension: { $sum: { $cond: ['$hypertension', 1, 0] } },
        cad: { $sum: { $cond: ['$coronaryArteryDisease', 1, 0] } },
        heartFailure: { $sum: { $cond: ['$heartFailure', 1, 0] } },
        stroke: { $sum: { $cond: ['$strokeHistory', 1, 0] } },
      },
    },
  ]);

  const item = records[0] || {};
  return [
    { name: 'Diabetes', value: item.diabetes || 0 },
    { name: 'Hypertension', value: item.hypertension || 0 },
    { name: 'CAD', value: item.cad || 0 },
    { name: 'Heart Failure', value: item.heartFailure || 0 },
    { name: 'Stroke History', value: item.stroke || 0 },
  ];
};

const riskDistribution = async () => {
  const risk = await Diagnosis.aggregate([
    { $group: { _id: '$riskLevel', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  return risk.map((item) => ({ riskLevel: item._id || 'Unknown', count: item.count }));
};

const followUpSummary = async () => {
  const today = startOfToday();

  const distribution = await FollowUp.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  const overdue = await FollowUp.countDocuments({ followUpDate: { $lt: today }, status: 'Pending' });

  return {
    byStatus: distribution.map((item) => ({ status: item._id, count: item.count })),
    overdue,
  };
};

const getRoleSpecificSummary = async (role) => {
  const summary = await buildSummary();

  if (role === 'RESEARCH_ADMIN') {
    return {
      researchEligibleCount: summary.researchConsentedPatients,
      highRiskPatients: summary.highRiskPatients,
      missingFollowUps: summary.missedFollowUps,
    };
  }

  if (role === 'DOCTOR') {
    return {
      visitsToday: summary.visitsToday,
      highRiskPatients: summary.highRiskPatients,
      followUpsToday: summary.followUpsToday,
      missedFollowUps: summary.missedFollowUps,
    };
  }

  if (role === 'STAFF') {
    return {
      newPatientsToday: summary.newPatientsToday,
      visitsToday: summary.visitsToday,
      followUpsToday: summary.followUpsToday,
      missedFollowUps: summary.missedFollowUps,
    };
  }

  return summary;
};

module.exports = {
  buildSummary,
  monthlyTrend,
  diseaseDistribution,
  riskDistribution,
  followUpSummary,
  getRoleSpecificSummary,
};

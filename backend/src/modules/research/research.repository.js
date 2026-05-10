const { Patient } = require('../patients/patient.model');

const buildMatchStage = (query = {}) => {
  const match = {
    researchConsent: true,
  };

  if (query.gender) match.gender = query.gender;
  if (query.district) match.district = query.district;
  if (query.province) match.province = query.province;

  return match;
};

const getResearchRecords = async (query = {}) => {
  const patientMatch = buildMatchStage(query);

  const visitDateMatch = {};
  if (query.startDate || query.endDate) {
    visitDateMatch.visitDate = {};
    if (query.startDate) visitDateMatch.visitDate.$gte = new Date(query.startDate);
    if (query.endDate) visitDateMatch.visitDate.$lte = new Date(query.endDate);
  }

  const rows = await Patient.aggregate([
    { $match: patientMatch },
    {
      $lookup: {
        from: 'visits',
        let: { patientId: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$patient', '$$patientId'] } } },
          ...(Object.keys(visitDateMatch).length ? [{ $match: visitDateMatch }] : []),
          { $sort: { visitDate: -1 } },
        ],
        as: 'visits',
      },
    },
    { $unwind: { path: '$visits', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'clinicalrecords',
        let: { visitId: '$visits._id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$visit', '$$visitId'] } } },
          { $sort: { createdAt: -1 } },
          { $limit: 1 },
        ],
        as: 'clinicalRecord',
      },
    },
    { $unwind: { path: '$clinicalRecord', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'labresults',
        let: { visitId: '$visits._id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$visit', '$$visitId'] } } },
          { $sort: { testDate: -1 } },
          { $limit: 1 },
        ],
        as: 'labResult',
      },
    },
    { $unwind: { path: '$labResult', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'diagnoses',
        let: { visitId: '$visits._id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$visit', '$$visitId'] } } },
          { $sort: { createdAt: -1 } },
          { $limit: 1 },
        ],
        as: 'diagnosis',
      },
    },
    { $unwind: { path: '$diagnosis', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'followups',
        let: { patientId: '$_id', visitId: '$visits._id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$patient', '$$patientId'] }, { $eq: ['$visit', '$$visitId'] }],
              },
            },
          },
          { $sort: { followUpDate: -1 } },
          { $limit: 1 },
        ],
        as: 'followUp',
      },
    },
    { $unwind: { path: '$followUp', preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 0,
        researchId: 1,
        age: 1,
        gender: 1,
        district: 1,
        province: 1,
        occupation: 1,
        maritalStatus: 1,

        visitDate: '$visits.visitDate',
        visitType: '$visits.visitType',

        heightCm: '$clinicalRecord.heightCm',
        weightKg: '$clinicalRecord.weightKg',
        bmi: '$clinicalRecord.bmi',
        bmiCategory: '$clinicalRecord.bmiCategory',
        waistCircumferenceCm: '$clinicalRecord.waistCircumferenceCm',
        systolicBP: '$clinicalRecord.systolicBP',
        diastolicBP: '$clinicalRecord.diastolicBP',
        bpCategory: '$clinicalRecord.bpCategory',
        pulse: '$clinicalRecord.pulse',
        diabetesStatus: '$clinicalRecord.diabetesStatus',
        diabetesDurationYears: '$clinicalRecord.diabetesDurationYears',
        insulinUse: '$clinicalRecord.insulinUse',
        hypertension: '$clinicalRecord.hypertension',
        coronaryArteryDisease: '$clinicalRecord.coronaryArteryDisease',
        chestPain: '$clinicalRecord.chestPain',
        heartFailure: '$clinicalRecord.heartFailure',
        strokeHistory: '$clinicalRecord.strokeHistory',
        chronicKidneyDisease: '$clinicalRecord.chronicKidneyDisease',
        smokingStatus: '$clinicalRecord.smokingStatus',
        alcoholUse: '$clinicalRecord.alcoholUse',
        physicalActivity: '$clinicalRecord.physicalActivity',
        familyHistoryDiabetes: '$clinicalRecord.familyHistoryDiabetes',
        familyHistoryHypertension: '$clinicalRecord.familyHistoryHypertension',
        familyHistoryHeartDisease: '$clinicalRecord.familyHistoryHeartDisease',

        fastingGlucose: '$labResult.fastingGlucose',
        postPrandialGlucose: '$labResult.postPrandialGlucose',
        randomGlucose: '$labResult.randomGlucose',
        hba1c: '$labResult.hba1c',
        totalCholesterol: '$labResult.totalCholesterol',
        ldl: '$labResult.ldl',
        hdl: '$labResult.hdl',
        triglycerides: '$labResult.triglycerides',
        serumCreatinine: '$labResult.serumCreatinine',
        egfr: '$labResult.egfr',
        uacr: '$labResult.uacr',
        ecgFinding: '$labResult.ecgFinding',
        echoFinding: '$labResult.echoFinding',
        ejectionFraction: '$labResult.ejectionFraction',

        diagnosisList: '$diagnosis.diagnosisList',
        riskLevel: '$diagnosis.riskLevel',
        outcome: '$diagnosis.outcome',
        followUpStatus: '$followUp.status',
      },
    },
  ]);

  return rows;
};

module.exports = { getResearchRecords };

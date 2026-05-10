const { connectDb } = require('../config/db');
const { Setting } = require('../modules/settings/setting.model');

const defaultSettings = [
  {
    key: 'departments',
    value: ['Cardiology', 'Endocrinology', 'General Medicine', 'Emergency'],
    description: 'Hospital departments',
  },
  {
    key: 'visitTypes',
    value: ['New', 'Follow-up', 'Camp', 'Charity'],
    description: 'Visit types',
  },
  {
    key: 'genderOptions',
    value: ['Male', 'Female', 'Other'],
    description: 'Gender options',
  },
  {
    key: 'riskLevels',
    value: ['Low', 'Moderate', 'High', 'Critical'],
    description: 'Risk level options',
  },
  {
    key: 'followUpStatuses',
    value: ['Pending', 'Completed', 'Missed', 'Rescheduled', 'Lost to follow-up'],
    description: 'Follow-up status options',
  },
  {
    key: 'diabetesStatuses',
    value: ['No Diabetes', 'Prediabetes', 'Type 1', 'Type 2', 'Gestational', 'Unknown'],
    description: 'Diabetes statuses',
  },
  {
    key: 'smokingStatuses',
    value: ['Never', 'Former', 'Current'],
    description: 'Smoking status options',
  },
  {
    key: 'alcoholUseOptions',
    value: ['No', 'Occasional', 'Regular'],
    description: 'Alcohol use options',
  },
  {
    key: 'physicalActivityOptions',
    value: ['Low', 'Moderate', 'High'],
    description: 'Physical activity options',
  },
  {
    key: 'commonDiagnoses',
    value: [
      'Type 2 Diabetes Mellitus',
      'Hypertension',
      'Coronary Artery Disease',
      'Heart Failure',
      'Chronic Kidney Disease',
    ],
    description: 'Common diagnosis presets',
  },
  {
    key: 'commonMedications',
    value: [
      'Metformin',
      'Insulin Glargine',
      'Amlodipine',
      'Atorvastatin',
      'Aspirin',
      'Losartan',
    ],
    description: 'Common medication presets',
  },
];

const seedSettings = async () => {
  await connectDb();

  for (const setting of defaultSettings) {
    await Setting.findOneAndUpdate({ key: setting.key }, setting, {
      upsert: true,
      new: true,
    });
  }

  // eslint-disable-next-line no-console
  console.log('Settings seeded successfully');
  process.exit(0);
};

seedSettings().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to seed settings', error);
  process.exit(1);
});

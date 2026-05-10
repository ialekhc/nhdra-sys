const mongoose = require('mongoose');

const clinicalRecordSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
    visit: { type: mongoose.Schema.Types.ObjectId, ref: 'Visit', required: true, unique: true, index: true },
    heightCm: { type: Number, min: 30, max: 300 },
    weightKg: { type: Number, min: 1, max: 500 },
    bmi: { type: Number, min: 0, max: 200 },
    bmiCategory: { type: String },
    waistCircumferenceCm: { type: Number, min: 0, max: 300 },
    systolicBP: { type: Number, min: 40, max: 300 },
    diastolicBP: { type: Number, min: 30, max: 200 },
    bpCategory: { type: String },
    pulse: { type: Number, min: 0, max: 300 },
    temperature: { type: Number, min: 30, max: 45 },
    spo2: { type: Number, min: 0, max: 100 },
    respiratoryRate: { type: Number, min: 0, max: 100 },

    diabetesStatus: {
      type: String,
      enum: ['No Diabetes', 'Prediabetes', 'Type 1', 'Type 2', 'Gestational', 'Unknown'],
      default: 'Unknown',
    },
    diabetesDurationYears: { type: Number, min: 0, max: 100 },
    currentDiabetesMedication: { type: String, trim: true },
    insulinUse: { type: Boolean, default: false },

    hypertension: { type: Boolean, default: false },
    coronaryArteryDisease: { type: Boolean, default: false },
    chestPain: { type: Boolean, default: false },
    heartFailure: { type: Boolean, default: false },
    strokeHistory: { type: Boolean, default: false },

    chronicKidneyDisease: { type: Boolean, default: false },
    proteinuria: { type: Boolean, default: false },

    smokingStatus: { type: String, enum: ['Never', 'Former', 'Current'] },
    alcoholUse: { type: String, enum: ['No', 'Occasional', 'Regular'] },
    physicalActivity: { type: String, enum: ['Low', 'Moderate', 'High'] },
    dietPattern: { type: String, trim: true },

    familyHistoryDiabetes: { type: Boolean, default: false },
    familyHistoryHypertension: { type: Boolean, default: false },
    familyHistoryHeartDisease: { type: Boolean, default: false },

    allergies: { type: String, trim: true },
    pastMedicalHistory: { type: String, trim: true },
    remarks: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const ClinicalRecord = mongoose.model('ClinicalRecord', clinicalRecordSchema);

module.exports = { ClinicalRecord };

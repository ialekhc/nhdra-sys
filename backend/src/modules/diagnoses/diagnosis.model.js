const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
    visit: { type: mongoose.Schema.Types.ObjectId, ref: 'Visit', required: true, unique: true, index: true },
    diagnosisList: [{ type: String, required: true, trim: true }],
    icdCodes: [{ type: String, trim: true }],
    riskLevel: { type: String, enum: ['Low', 'Moderate', 'High', 'Critical'], index: true, required: true },
    treatmentPlan: { type: String, trim: true },
    lifestyleAdvice: { type: String, trim: true },
    doctorNotes: { type: String, trim: true },
    outcome: { type: String, trim: true },
    nextFollowUpDate: { type: Date, index: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

module.exports = { Diagnosis };

const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
    visit: { type: mongoose.Schema.Types.ObjectId, ref: 'Visit', required: true, index: true },
    drugName: { type: String, required: true, trim: true },
    dose: { type: String, trim: true },
    frequency: { type: String, trim: true },
    duration: { type: String, trim: true },
    instruction: { type: String, trim: true },
    prescribedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Medication = mongoose.model('Medication', medicationSchema);

module.exports = { Medication };

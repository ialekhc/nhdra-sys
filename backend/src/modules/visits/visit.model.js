const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema(
  {
    visitId: { type: String, unique: true, sparse: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
    visitDate: { type: Date, required: true, index: true },
    visitType: { type: String, enum: ['New', 'Follow-up', 'Emergency'], required: true },
    department: { type: String, trim: true },
    assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    chiefComplaint: { type: String, required: true, trim: true },
    symptoms: [{ type: String, trim: true }],
    visitNotes: { type: String, trim: true },
    status: { type: String, enum: ['Open', 'Completed', 'Cancelled'], default: 'Open', index: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Visit = mongoose.model('Visit', visitSchema);

module.exports = { Visit };

const mongoose = require('mongoose');
const { ROLES } = require('../../constants/roles');

const patientReportSnapshotSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
    patientId: { type: String, trim: true, index: true },
    researchId: { type: String, trim: true, index: true },
    reportType: { type: String, default: 'OVERALL_PATIENT_REPORT', index: true },
    snapshot: { type: mongoose.Schema.Types.Mixed, required: true },
    generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    generatedByRole: { type: String, enum: Object.values(ROLES), required: true, index: true },
    generatedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

patientReportSnapshotSchema.index({ patient: 1, generatedAt: -1 });

const PatientReportSnapshot = mongoose.model('PatientReportSnapshot', patientReportSnapshotSchema);

module.exports = { PatientReportSnapshot };

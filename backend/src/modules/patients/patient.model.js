const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true, unique: true, index: true },
    researchId: { type: String, required: true, unique: true, index: true },
    fullName: { type: String, required: true, trim: true, index: true },
    dateOfBirth: { type: Date },
    age: { type: Number, min: 0, max: 130 },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    phone: { type: String, required: true, trim: true, index: true },
    address: { type: String, trim: true },
    district: { type: String, trim: true },
    province: { type: String, trim: true },
    occupation: { type: String, trim: true },
    maritalStatus: { type: String, trim: true },
    emergencyContactName: { type: String, trim: true },
    emergencyContactPhone: { type: String, trim: true },
    referredBy: { type: String, trim: true },
    treatmentConsent: { type: Boolean, required: true },
    researchConsent: { type: Boolean, default: false, index: true },
    status: { type: String, enum: ['active', 'archived'], default: 'active', index: true },
    archivedAt: { type: Date },
    archivedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

patientSchema.index({ fullName: 1, phone: 1, status: 1 }, { unique: true, partialFilterExpression: { status: 'active' } });

const Patient = mongoose.model('Patient', patientSchema);

module.exports = { Patient };

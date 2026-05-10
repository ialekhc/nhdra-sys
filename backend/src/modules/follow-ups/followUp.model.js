const mongoose = require('mongoose');

const followUpSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
    visit: { type: mongoose.Schema.Types.ObjectId, ref: 'Visit' },
    followUpDate: { type: Date, required: true, index: true },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Missed', 'Rescheduled', 'Lost to follow-up'],
      default: 'Pending',
      index: true,
    },
    calledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    callDate: { type: Date },
    patientResponse: { type: String, trim: true },
    nextAction: { type: String, trim: true },
    remarks: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const FollowUp = mongoose.model('FollowUp', followUpSchema);

module.exports = { FollowUp };

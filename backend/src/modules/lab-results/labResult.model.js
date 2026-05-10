const mongoose = require('mongoose');

const labResultSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
    visit: { type: mongoose.Schema.Types.ObjectId, ref: 'Visit', required: true, index: true },

    fastingGlucose: { type: Number, min: 0 },
    postPrandialGlucose: { type: Number, min: 0 },
    randomGlucose: { type: Number, min: 0 },
    hba1c: { type: Number, min: 0, max: 30 },

    totalCholesterol: { type: Number, min: 0 },
    ldl: { type: Number, min: 0 },
    hdl: { type: Number, min: 0 },
    triglycerides: { type: Number, min: 0 },

    serumCreatinine: { type: Number, min: 0 },
    egfr: { type: Number, min: 0 },
    uacr: { type: Number, min: 0 },

    ecgFinding: { type: String, trim: true },
    echoFinding: { type: String, trim: true },
    ejectionFraction: { type: Number, min: 0, max: 100 },
    troponin: { type: Number, min: 0 },

    hemoglobin: { type: Number, min: 0 },
    urineRoutine: { type: String, trim: true },
    reportFileUrl: { type: String, trim: true },
    remarks: { type: String, trim: true },
    testDate: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const LabResult = mongoose.model('LabResult', labResultSchema);

module.exports = { LabResult };

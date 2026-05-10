const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true, trim: true },
    module: { type: String, required: true, trim: true },
    entityId: { type: String },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, trim: true },
    method: { type: String, trim: true },
    endpoint: { type: String, trim: true },
    statusCode: { type: Number },
    meta: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

auditLogSchema.index({ createdAt: -1 });

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = { AuditLog };

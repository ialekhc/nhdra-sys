const { AuditLog } = require('./auditLog.model');

const listAuditLogs = async (filter, options) => {
  const [items, total] = await Promise.all([
    AuditLog.find(filter)
      .populate('performedBy', 'name email role')
      .sort({ createdAt: -1 })
      .skip(options.skip)
      .limit(options.limit),
    AuditLog.countDocuments(filter),
  ]);

  return { items, total };
};

module.exports = { listAuditLogs };

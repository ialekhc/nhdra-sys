const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');
const { getAuditLogsService } = require('./auditLog.service');

const getAuditLogs = asyncHandler(async (req, res) => {
  const { logs, meta } = await getAuditLogsService(req.query);
  res.status(200).json(new ApiResponse(200, 'Audit logs fetched successfully', logs, meta));
});

module.exports = { getAuditLogs };

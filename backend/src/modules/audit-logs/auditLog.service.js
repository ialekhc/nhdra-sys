const { getPagination } = require('../../utils/pagination');
const { listAuditLogs } = require('./auditLog.repository');

const getAuditLogsService = async (query) => {
  const { page, limit, skip } = getPagination(query);
  const filter = {};

  if (query.module) filter.module = query.module;
  if (query.action) filter.action = query.action;
  if (query.role) filter.role = query.role;

  const { items, total } = await listAuditLogs(filter, { skip, limit });

  return {
    logs: items,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};

module.exports = { getAuditLogsService };

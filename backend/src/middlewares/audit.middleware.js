const { AuditLog } = require('../modules/audit-logs/auditLog.model');

const auditMiddleware = (action, moduleName) => {
  return async (req, res, next) => {
    res.on('finish', async () => {
      if (res.statusCode >= 400) return;
      try {
        await AuditLog.create({
          action,
          module: moduleName,
          entityId: req.params.id || req.body.id || null,
          performedBy: req.user?.id || null,
          role: req.user?.role || 'SYSTEM',
          method: req.method,
          endpoint: req.originalUrl,
          statusCode: res.statusCode,
          meta: {
            query: req.query,
            bodyKeys: Object.keys(req.body || {}),
          },
        });
      } catch (error) {
        // Intentionally ignore audit write failures to avoid impacting core flow.
      }
    });

    next();
  };
};

module.exports = { auditMiddleware };

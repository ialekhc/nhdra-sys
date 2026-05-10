import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { parseApiError } from '../../../api/apiErrorHandler';
import { auditLogApi } from '../api/auditLogApi';
import { DataTable } from '../../../shared/components/ui/DataTable';
import { Loader } from '../../../shared/components/ui/Loader';
import { formatDate } from '../../../shared/utils/formatDate';

export const AuditLogsPage = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        setLoading(true);
        const response = await auditLogApi.list({ limit: 100 });
        setRows(response.data.data || []);
      } catch (error) {
        toast.error(parseApiError(error));
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, []);

  const columns = [
    { key: 'createdAt', label: 'Date', render: (row) => formatDate(row.createdAt) },
    { key: 'module', label: 'Module' },
    { key: 'action', label: 'Action' },
    { key: 'role', label: 'Role' },
    { key: 'endpoint', label: 'Endpoint' },
    { key: 'statusCode', label: 'Status' },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Audit Logs</h1>
      {loading ? <Loader /> : <DataTable columns={columns} rows={rows} keyField="_id" />}
    </div>
  );
};

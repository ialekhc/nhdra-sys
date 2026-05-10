import { formatDate } from '../../../shared/utils/formatDate';
import { DataTable } from '../../../shared/components/ui/DataTable';
import { Badge } from '../../../shared/components/ui/Badge';

export const VisitTable = ({ rows = [] }) => {
  const columns = [
    { key: 'visitId', label: 'Visit ID' },
    { key: 'visitDate', label: 'Visit Date', render: (row) => formatDate(row.visitDate) },
    { key: 'visitType', label: 'Visit Type' },
    { key: 'chiefComplaint', label: 'Chief Complaint' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <Badge variant={row.status === 'Completed' ? 'success' : row.status === 'Cancelled' ? 'danger' : 'info'}>{row.status}</Badge>,
    },
  ];

  return <DataTable columns={columns} rows={rows} keyField="_id" />;
};

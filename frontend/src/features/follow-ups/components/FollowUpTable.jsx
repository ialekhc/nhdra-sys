import { formatDate } from '../../../shared/utils/formatDate';
import { DataTable } from '../../../shared/components/ui/DataTable';
import { FollowUpStatusBadge } from './FollowUpStatusBadge';

export const FollowUpTable = ({ rows = [] }) => {
  const columns = [
    { key: 'patient', label: 'Patient', render: (row) => row.patient?.fullName || '-' },
    { key: 'followUpDate', label: 'Follow-up Date', render: (row) => formatDate(row.followUpDate) },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <FollowUpStatusBadge status={row.status} overdue={row.overdue} />,
    },
    { key: 'patientResponse', label: 'Response' },
    { key: 'nextAction', label: 'Next Action' },
  ];

  return <DataTable columns={columns} rows={rows} keyField="_id" />;
};

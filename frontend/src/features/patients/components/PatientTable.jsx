import { Link } from 'react-router-dom';
import { DataTable } from '../../../shared/components/ui/DataTable';
import { Badge } from '../../../shared/components/ui/Badge';

export const PatientTable = ({ rows = [] }) => {
  const columns = [
    { key: 'patientId', label: 'Patient ID' },
    { key: 'fullName', label: 'Full Name' },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <Badge variant={row.status === 'active' ? 'success' : 'warning'}>{row.status}</Badge>,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <Link className="font-medium text-brand-700 hover:text-brand-900" to={`/patients/${row._id}`}>
          View
        </Link>
      ),
    },
  ];

  return <DataTable columns={columns} rows={rows} keyField="_id" />;
};

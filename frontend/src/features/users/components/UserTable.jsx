import { DataTable } from '../../../shared/components/ui/DataTable';
import { Badge } from '../../../shared/components/ui/Badge';

export const UserTable = ({ rows = [] }) => {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <Badge variant={row.status === 'active' ? 'success' : 'warning'}>{row.status}</Badge>,
    },
    { key: 'department', label: 'Department' },
  ];

  return <DataTable columns={columns} rows={rows} keyField="_id" />;
};

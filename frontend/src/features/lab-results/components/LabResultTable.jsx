import { formatDate } from '../../../shared/utils/formatDate';
import { DataTable } from '../../../shared/components/ui/DataTable';

export const LabResultTable = ({ rows = [] }) => {
  const columns = [
    { key: 'testDate', label: 'Test Date', render: (row) => formatDate(row.testDate) },
    { key: 'hba1c', label: 'HbA1c' },
    { key: 'fastingGlucose', label: 'Fasting Glucose' },
    { key: 'postPrandialGlucose', label: 'PP Glucose' },
    { key: 'ldl', label: 'LDL' },
    { key: 'hdl', label: 'HDL' },
    { key: 'ecgFinding', label: 'ECG' },
  ];

  return <DataTable columns={columns} rows={rows} keyField="_id" />;
};

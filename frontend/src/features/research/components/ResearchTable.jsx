import { formatDate } from '../../../shared/utils/formatDate';
import { DataTable } from '../../../shared/components/ui/DataTable';

export const ResearchTable = ({ rows = [] }) => {
  const columns = [
    { key: 'researchId', label: 'Research ID' },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' },
    { key: 'district', label: 'District' },
    { key: 'visitDate', label: 'Visit Date', render: (row) => formatDate(row.visitDate) },
    { key: 'visitType', label: 'Visit Type' },
    { key: 'bmi', label: 'BMI' },
    { key: 'bpCategory', label: 'BP Category' },
    { key: 'hba1c', label: 'HbA1c' },
    { key: 'riskLevel', label: 'Risk Level' },
    { key: 'followUpStatus', label: 'Follow-up' },
  ];

  return <DataTable columns={columns} rows={rows} keyField="researchId" />;
};

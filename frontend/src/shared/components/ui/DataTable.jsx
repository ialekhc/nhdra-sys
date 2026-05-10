import { EmptyState } from './EmptyState';

export const DataTable = ({ columns = [], rows = [], keyField = 'id' }) => {
  if (!rows?.length) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-auto rounded-lg border border-slate-200 bg-white shadow-card">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-3 py-2 text-left font-semibold text-slate-600">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row[keyField] || row._id}>
              {columns.map((column) => (
                <td key={column.key} className="px-3 py-2 text-slate-700">
                  {column.render ? column.render(row) : row[column.key] ?? '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

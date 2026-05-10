export const EmptyState = ({ title = 'No records found', description = 'Try adjusting filters or adding a new record.' }) => (
  <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
    <h3 className="text-base font-semibold text-slate-800">{title}</h3>
    <p className="mt-1 text-sm text-slate-500">{description}</p>
  </div>
);

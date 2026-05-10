export const ChartCard = ({ title, children }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
    <h3 className="mb-3 text-base font-semibold text-slate-900">{title}</h3>
    {children}
  </div>
);

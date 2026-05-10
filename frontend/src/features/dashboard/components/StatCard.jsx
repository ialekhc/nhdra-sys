export const StatCard = ({ label, value, hint }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="mt-2 text-2xl font-bold text-slate-900">{value ?? 0}</p>
    {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
  </div>
);

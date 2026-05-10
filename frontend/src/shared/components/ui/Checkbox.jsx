export const Checkbox = ({ label, ...props }) => (
  <label className="inline-flex items-center gap-2 text-sm text-slate-700">
    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-brand-600" {...props} />
    <span>{label}</span>
  </label>
);

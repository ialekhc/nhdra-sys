import { Input } from '../../../shared/components/ui/Input';

export const PatientSearch = ({ value, onChange }) => (
  <div className="w-full max-w-sm">
    <Input placeholder="Search by name, phone, patient ID" value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

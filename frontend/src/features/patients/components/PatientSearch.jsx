import { Input } from '../../../shared/components/ui/Input';
import { Select } from '../../../shared/components/ui/Select';

export const PatientSearch = ({ value, onChange, sortOption, onSortChange }) => (
  <div className="flex w-full flex-col gap-2 md:max-w-2xl md:flex-row">
    <Input
      placeholder="Search by name, phone, or patient ID (use phone if patient forgot ID)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <Select className="md:max-w-72" value={sortOption} onChange={(e) => onSortChange(e.target.value)}>
      <option value="recent">Sort: Newest First</option>
      <option value="patientIdAsc">Sort: Patient ID (A-Z)</option>
      <option value="patientIdDesc">Sort: Patient ID (Z-A)</option>
      <option value="phoneAsc">Sort: Phone (Ascending)</option>
      <option value="phoneDesc">Sort: Phone (Descending)</option>
    </Select>
  </div>
);

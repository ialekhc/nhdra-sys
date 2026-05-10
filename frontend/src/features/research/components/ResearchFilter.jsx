import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';

export const ResearchFilter = ({ filters, setFilters, onApply }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
    <div className="grid gap-3 md:grid-cols-4">
      <Input
        type="date"
        value={filters.startDate || ''}
        onChange={(e) => setFilters((prev) => ({ ...prev, startDate: e.target.value }))}
      />
      <Input
        type="date"
        value={filters.endDate || ''}
        onChange={(e) => setFilters((prev) => ({ ...prev, endDate: e.target.value }))}
      />
      <Input
        placeholder="District"
        value={filters.district || ''}
        onChange={(e) => setFilters((prev) => ({ ...prev, district: e.target.value }))}
      />
      <Input
        placeholder="Province"
        value={filters.province || ''}
        onChange={(e) => setFilters((prev) => ({ ...prev, province: e.target.value }))}
      />
    </div>
    <div className="mt-3">
      <Button onClick={onApply}>Apply Filters</Button>
    </div>
  </div>
);

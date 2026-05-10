import { Button } from '../../../shared/components/ui/Button';

export const ExportButtons = ({ onExportExcel, onExportCsv, loading }) => (
  <div className="flex flex-wrap gap-2">
    <Button onClick={onExportExcel} disabled={loading}>
      Export Excel
    </Button>
    <Button variant="secondary" onClick={onExportCsv} disabled={loading}>
      Export CSV
    </Button>
  </div>
);

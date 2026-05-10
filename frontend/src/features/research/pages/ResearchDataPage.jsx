import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { parseApiError } from '../../../api/apiErrorHandler';
import { researchApi } from '../api/researchApi';
import { ResearchFilter } from '../components/ResearchFilter';
import { ResearchTable } from '../components/ResearchTable';
import { ExportButtons } from '../components/ExportButtons';
import { Loader } from '../../../shared/components/ui/Loader';
import { downloadFile } from '../../../shared/utils/downloadFile';

export const ResearchDataPage = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);
  const [filters, setFilters] = useState({});

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await researchApi.dataset(filters);
      setRows(response.data.data || []);
    } catch (error) {
      toast.error(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onExportExcel = async () => {
    try {
      setExportLoading(true);
      await downloadFile(() => researchApi.exportExcel(filters), `research-data-${Date.now()}.xlsx`);
      toast.success('Excel exported successfully');
    } catch (error) {
      toast.error(parseApiError(error));
    } finally {
      setExportLoading(false);
    }
  };

  const onExportCsv = async () => {
    try {
      setExportLoading(true);
      await downloadFile(() => researchApi.exportCsv(filters), `research-data-${Date.now()}.csv`);
      toast.success('CSV exported successfully');
    } catch (error) {
      toast.error(parseApiError(error));
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-bold text-slate-900">Research Data (De-identified)</h1>
        <ExportButtons onExportExcel={onExportExcel} onExportCsv={onExportCsv} loading={exportLoading} />
      </div>

      <ResearchFilter filters={filters} setFilters={setFilters} onApply={loadData} />

      {loading ? <Loader /> : <ResearchTable rows={rows} />}
    </div>
  );
};

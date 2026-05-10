import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { parseApiError } from '../../../api/apiErrorHandler';
import { patientApi } from '../api/patientApi';
import { PatientSearch } from '../components/PatientSearch';
import { PatientTable } from '../components/PatientTable';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { Loader } from '../../../shared/components/ui/Loader';

export const PatientsPage = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        setLoading(true);
        const response = await patientApi.list({ search: debouncedSearch, limit: 20 });
        setPatients(response.data.data || []);
      } catch (error) {
        toast.error(parseApiError(error));
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, [debouncedSearch]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-bold text-slate-900">Patients</h1>
        <PatientSearch value={search} onChange={setSearch} />
      </div>

      {loading ? <Loader /> : <PatientTable rows={patients} />}
    </div>
  );
};

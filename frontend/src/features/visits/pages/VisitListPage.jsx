import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { parseApiError } from '../../../api/apiErrorHandler';
import { visitApi } from '../api/visitApi';
import { VisitTable } from '../components/VisitTable';
import { Loader } from '../../../shared/components/ui/Loader';

export const VisitListPage = () => {
  const { id } = useParams();
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVisits = async () => {
      try {
        setLoading(true);
        const response = await visitApi.getByPatient(id);
        setVisits(response.data.data || []);
      } catch (error) {
        toast.error(parseApiError(error));
      } finally {
        setLoading(false);
      }
    };

    loadVisits();
  }, [id]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Visit History</h1>
      {loading ? <Loader /> : <VisitTable rows={visits} />}
    </div>
  );
};

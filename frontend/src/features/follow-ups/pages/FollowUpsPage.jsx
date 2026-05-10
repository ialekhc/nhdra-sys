import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { parseApiError } from '../../../api/apiErrorHandler';
import { followUpApi } from '../api/followUpApi';
import { FollowUpTable } from '../components/FollowUpTable';
import { Loader } from '../../../shared/components/ui/Loader';
import { Button } from '../../../shared/components/ui/Button';

export const FollowUpsPage = () => {
  const { id } = useParams();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  const loadData = async (filter = 'all') => {
    try {
      setLoading(true);

      let response;
      if (id) {
        response = await followUpApi.getByPatient(id);
      } else if (filter === 'today') {
        response = await followUpApi.today();
      } else if (filter === 'missed') {
        response = await followUpApi.missed();
      } else {
        response = await followUpApi.list({ limit: 50 });
      }

      setRows(response.data.data || []);
      setActiveFilter(filter);
    } catch (error) {
      toast.error(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData('all');
  }, [id]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-bold text-slate-900">Follow-ups</h1>
        {!id ? (
          <div className="flex gap-2">
            <Button variant={activeFilter === 'all' ? 'primary' : 'secondary'} onClick={() => loadData('all')}>
              All
            </Button>
            <Button variant={activeFilter === 'today' ? 'primary' : 'secondary'} onClick={() => loadData('today')}>
              Today
            </Button>
            <Button variant={activeFilter === 'missed' ? 'primary' : 'secondary'} onClick={() => loadData('missed')}>
              Missed
            </Button>
          </div>
        ) : null}
      </div>

      {loading ? <Loader /> : <FollowUpTable rows={rows} />}
    </div>
  );
};

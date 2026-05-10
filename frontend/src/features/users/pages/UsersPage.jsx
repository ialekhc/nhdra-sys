import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { parseApiError } from '../../../api/apiErrorHandler';
import { userApi } from '../api/userApi';
import { UserForm } from '../components/UserForm';
import { UserTable } from '../components/UserTable';
import { Loader } from '../../../shared/components/ui/Loader';

export const UsersPage = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await userApi.list({ limit: 100 });
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

  const onSubmit = async (values) => {
    try {
      setSubmitting(true);
      await userApi.create(values);
      toast.success('User created successfully');
      await loadData();
    } catch (error) {
      toast.error(parseApiError(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Users</h1>
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
        <UserForm onSubmit={onSubmit} submitting={submitting} />
      </div>
      {loading ? <Loader /> : <UserTable rows={rows} />}
    </div>
  );
};

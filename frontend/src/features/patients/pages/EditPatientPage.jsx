import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { parseApiError } from '../../../api/apiErrorHandler';
import { patientApi } from '../api/patientApi';
import { PatientForm } from '../components/PatientForm';
import { Loader } from '../../../shared/components/ui/Loader';

export const EditPatientPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadPatient = async () => {
      try {
        const response = await patientApi.getById(id);
        setPatient(response.data.data);
      } catch (error) {
        toast.error(parseApiError(error));
      } finally {
        setLoading(false);
      }
    };

    loadPatient();
  }, [id]);

  const onSubmit = async (values) => {
    try {
      setSubmitting(true);
      const payload = {
        ...values,
        age: values.age ? Number(values.age) : undefined,
      };
      await patientApi.update(id, payload);
      toast.success('Patient updated successfully');
      navigate(`/patients/${id}`);
    } catch (error) {
      toast.error(parseApiError(error));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Edit Patient</h1>
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
        <PatientForm initialValues={patient} onSubmit={onSubmit} submitting={submitting} />
      </div>
    </div>
  );
};

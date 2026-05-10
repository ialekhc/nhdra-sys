import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { parseApiError } from '../../../api/apiErrorHandler';
import { patientApi } from '../api/patientApi';
import { PatientForm } from '../components/PatientForm';

export const RegisterPatientPage = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values) => {
    try {
      setSubmitting(true);
      const payload = {
        ...values,
        age: values.age ? Number(values.age) : undefined,
      };
      const response = await patientApi.create(payload);
      toast.success('Patient registered successfully');
      navigate(`/patients/${response.data.data._id}/visits/new`);
    } catch (error) {
      toast.error(parseApiError(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Register Patient</h1>
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
        <PatientForm
          onSubmit={onSubmit}
          submitting={submitting}
          submitLabel="Save & Proceed to Next"
          submittingLabel="Saving & Proceeding..."
        />
      </div>
    </div>
  );
};

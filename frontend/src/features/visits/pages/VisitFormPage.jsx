import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { parseApiError } from '../../../api/apiErrorHandler';
import { visitApi } from '../api/visitApi';
import { VisitForm } from '../components/VisitForm';
import { patientApi } from '../../patients/api/patientApi';
import { Loader } from '../../../shared/components/ui/Loader';
import { PatientWorkflowHeader } from '../../patients/components/PatientWorkflowHeader';

export const VisitFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loadingPatient, setLoadingPatient] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadPatient = async () => {
      try {
        setLoadingPatient(true);
        const response = await patientApi.getById(id);
        setPatient(response.data.data);
      } catch (error) {
        toast.error(parseApiError(error));
      } finally {
        setLoadingPatient(false);
      }
    };

    loadPatient();
  }, [id]);

  const onSubmit = async (values) => {
    try {
      setSubmitting(true);
      const payload = {
        ...values,
        visitDate: new Date(values.visitDate).toISOString(),
        symptoms: values.symptoms ? values.symptoms.split(',').map((item) => item.trim()).filter(Boolean) : [],
      };

      await visitApi.create(payload);
      toast.success('Visit created successfully');
      navigate(`/patients/${id}/clinical-record`);
    } catch (error) {
      toast.error(parseApiError(error));
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingPatient) return <Loader text="Loading patient details..." />;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Create Visit</h1>
      <PatientWorkflowHeader patient={patient} active="visits" />
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
        <VisitForm
          patientId={id}
          onSubmit={onSubmit}
          submitting={submitting}
          submitLabel="Save & Proceed to Next"
          submittingLabel="Saving & Proceeding..."
        />
      </div>
    </div>
  );
};

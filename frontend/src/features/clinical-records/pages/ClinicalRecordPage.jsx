import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { parseApiError } from '../../../api/apiErrorHandler';
import { visitApi } from '../../visits/api/visitApi';
import { clinicalRecordApi } from '../api/clinicalRecordApi';
import { ClinicalRecordForm } from '../components/ClinicalRecordForm';
import { VitalsCard } from '../components/VitalsCard';
import { Loader } from '../../../shared/components/ui/Loader';
import { patientApi } from '../../patients/api/patientApi';
import { PatientWorkflowHeader } from '../../patients/components/PatientWorkflowHeader';

export const ClinicalRecordPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [visitId, setVisitId] = useState('');
  const [latestRecord, setLatestRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadExisting = async () => {
    try {
      setLoading(true);
      const [patientResponse, visitsResponse] = await Promise.all([patientApi.getById(id), visitApi.getByPatient(id)]);
      setPatient(patientResponse.data.data);
      const latestVisit = visitsResponse.data.data?.[0];
      setVisitId(latestVisit?._id || '');

      if (latestVisit?._id) {
        try {
          const clinicalResponse = await clinicalRecordApi.getByVisit(latestVisit._id);
          setLatestRecord(clinicalResponse.data.data);
        } catch {
          setLatestRecord(null);
        }
      }
    } catch (error) {
      toast.error(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExisting();
  }, [id]);

  const onSubmit = async (values) => {
    if (!visitId) {
      toast.error('Create a visit first');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        ...values,
        patient: id,
        visit: visitId,
      };

      if (latestRecord?._id) {
        await clinicalRecordApi.update(latestRecord._id, payload);
      } else {
        await clinicalRecordApi.create(payload);
      }

      toast.success('Clinical record saved successfully');
      navigate(`/patients/${id}/lab-results`);
    } catch (error) {
      toast.error(parseApiError(error));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Clinical Record</h1>
      <PatientWorkflowHeader patient={patient} active="clinical-record" />
      <VitalsCard record={latestRecord} />
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
        <ClinicalRecordForm
          patientId={id}
          visitId={visitId}
          onSubmit={onSubmit}
          submitting={submitting}
          submitLabel="Save & Proceed to Next"
          submittingLabel="Saving & Proceeding..."
        />
      </div>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { parseApiError } from '../../../api/apiErrorHandler';
import { visitApi } from '../../visits/api/visitApi';
import { labResultApi } from '../api/labResultApi';
import { LabResultForm } from '../components/LabResultForm';
import { LabResultTable } from '../components/LabResultTable';
import { Loader } from '../../../shared/components/ui/Loader';
import { patientApi } from '../../patients/api/patientApi';
import { PatientWorkflowHeader } from '../../patients/components/PatientWorkflowHeader';

export const LabResultsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [visitId, setVisitId] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [patientResponse, visitsResponse, resultsResponse] = await Promise.all([
        patientApi.getById(id),
        visitApi.getByPatient(id),
        labResultApi.getByPatient(id),
      ]);

      setPatient(patientResponse.data.data);
      setVisitId(visitsResponse.data.data?.[0]?._id || '');
      setRows(resultsResponse.data.data || []);
    } catch (error) {
      toast.error(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('report', file);
    const response = await labResultApi.upload(formData);
    return response.data.data.fileUrl;
  };

  const onSubmit = async (values) => {
    if (!visitId) {
      toast.error('Create visit first');
      return;
    }

    try {
      setSubmitting(true);
      await labResultApi.create({
        ...values,
        patient: id,
        visit: visitId,
        testDate: new Date(values.testDate).toISOString(),
      });

      toast.success('Lab result saved successfully');
      navigate(`/patients/${id}/diagnosis`);
    } catch (error) {
      toast.error(parseApiError(error));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Lab Results</h1>
      <PatientWorkflowHeader patient={patient} active="lab-results" />
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
        <LabResultForm
          patientId={id}
          visitId={visitId}
          onSubmit={onSubmit}
          onUpload={handleUpload}
          submitting={submitting}
          submitLabel="Save & Proceed to Next"
          submittingLabel="Saving & Proceeding..."
        />
      </div>
      <LabResultTable rows={rows} />
    </div>
  );
};

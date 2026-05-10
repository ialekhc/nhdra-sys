import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { parseApiError } from '../../../api/apiErrorHandler';
import { visitApi } from '../../visits/api/visitApi';
import { diagnosisApi } from '../api/diagnosisApi';
import { DiagnosisForm } from '../components/DiagnosisForm';
import { MedicationForm } from '../components/MedicationForm';
import { DataTable } from '../../../shared/components/ui/DataTable';
import { Loader } from '../../../shared/components/ui/Loader';
import { formatDate } from '../../../shared/utils/formatDate';
import { patientApi } from '../../patients/api/patientApi';
import { PatientWorkflowHeader } from '../../patients/components/PatientWorkflowHeader';

export const DiagnosisPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [visitId, setVisitId] = useState('');
  const [diagnoses, setDiagnoses] = useState([]);
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [patientResponse, visitsResponse, diagnosisResponse, medicationResponse] = await Promise.all([
        patientApi.getById(id),
        visitApi.getByPatient(id),
        diagnosisApi.getByPatient(id),
        diagnosisApi.getMedicationsByPatient(id),
      ]);

      setPatient(patientResponse.data.data);
      setVisitId(visitsResponse.data.data?.[0]?._id || '');
      setDiagnoses(diagnosisResponse.data.data || []);
      setMedications(medicationResponse.data.data || []);
    } catch (error) {
      toast.error(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleDiagnosisSubmit = async (values) => {
    if (!visitId) {
      toast.error('Create visit first');
      return;
    }

    try {
      setSubmitting(true);
      await diagnosisApi.create({
        ...values,
        patient: id,
        visit: visitId,
        diagnosisList: values.diagnosisList
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
        nextFollowUpDate: values.nextFollowUpDate ? new Date(values.nextFollowUpDate).toISOString() : undefined,
      });

      toast.success('Diagnosis saved successfully');
      navigate(`/patients/${id}/follow-ups`);
    } catch (error) {
      toast.error(parseApiError(error));
    } finally {
      setSubmitting(false);
    }
  };

  const handleMedicationSubmit = async (values) => {
    if (!visitId) {
      toast.error('Create visit first');
      return;
    }

    try {
      setSubmitting(true);
      await diagnosisApi.createMedication({
        ...values,
        patient: id,
        visit: visitId,
      });
      toast.success('Medication added');
      await loadData();
    } catch (error) {
      toast.error(parseApiError(error));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  const diagnosisColumns = [
    { key: 'createdAt', label: 'Date', render: (row) => formatDate(row.createdAt) },
    { key: 'diagnosisList', label: 'Diagnosis', render: (row) => (row.diagnosisList || []).join(', ') },
    { key: 'riskLevel', label: 'Risk' },
    { key: 'nextFollowUpDate', label: 'Next Follow-up', render: (row) => formatDate(row.nextFollowUpDate) },
  ];

  const medicationColumns = [
    { key: 'drugName', label: 'Drug Name' },
    { key: 'dose', label: 'Dose' },
    { key: 'frequency', label: 'Frequency' },
    { key: 'duration', label: 'Duration' },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Diagnosis & Treatment</h1>
      <PatientWorkflowHeader patient={patient} active="diagnosis" />

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
        <DiagnosisForm
          patientId={id}
          visitId={visitId}
          onSubmit={handleDiagnosisSubmit}
          submitting={submitting}
          submitLabel="Save & Proceed to Next"
          submittingLabel="Saving & Proceeding..."
        />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
        <h2 className="mb-3 text-base font-semibold">Prescribed Medications</h2>
        <MedicationForm patientId={id} visitId={visitId} onSubmit={handleMedicationSubmit} submitting={submitting} />
      </div>

      <div className="space-y-4">
        <DataTable columns={diagnosisColumns} rows={diagnoses} keyField="_id" />
        <DataTable columns={medicationColumns} rows={medications} keyField="_id" />
      </div>
    </div>
  );
};

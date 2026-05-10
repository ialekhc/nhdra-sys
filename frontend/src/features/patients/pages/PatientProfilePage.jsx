import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { parseApiError } from '../../../api/apiErrorHandler';
import { patientApi } from '../api/patientApi';
import { visitApi } from '../../visits/api/visitApi';
import { diagnosisApi } from '../../diagnoses/api/diagnosisApi';
import { followUpApi } from '../../follow-ups/api/followUpApi';
import { reportApi } from '../../reports/api/reportApi';
import { PatientProfileHeader } from '../components/PatientProfileHeader';
import { PatientSummaryCard } from '../components/PatientSummaryCard';
import { PatientTabs } from '../components/PatientTabs';
import { Loader } from '../../../shared/components/ui/Loader';
import { ConfirmDialog } from '../../../shared/components/ui/ConfirmDialog';
import { useAuthStore } from '../../auth/store/authStore';
import { ROLES } from '../../../constants/roles';
import { buildPatientReportPrintHtml } from '../utils/buildPatientReportPrintHtml';

export const PatientProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [patient, setPatient] = useState(null);
  const [latestRiskLevel, setLatestRiskLevel] = useState('-');
  const [lastVisitDate, setLastVisitDate] = useState(null);
  const [nextFollowUpDate, setNextFollowUpDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [patientRes, visitsRes, diagnosisRes, followUpsRes] = await Promise.all([
          patientApi.getById(id),
          visitApi.getByPatient(id),
          diagnosisApi.getByPatient(id),
          followUpApi.getByPatient(id),
        ]);

        const patientData = patientRes.data.data;
        const visits = visitsRes.data.data || [];
        const diagnoses = diagnosisRes.data.data || [];
        const followUps = followUpsRes.data.data || [];

        setPatient(patientData);
        setLastVisitDate(visits[0]?.visitDate || null);
        setLatestRiskLevel(diagnoses[0]?.riskLevel || '-');
        setNextFollowUpDate(followUps[0]?.followUpDate || null);
      } catch (error) {
        toast.error(parseApiError(error));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) return <Loader />;
  if (!patient) return null;

  const canManagePatient = [ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(user?.role);

  const handleDeletePatient = async () => {
    try {
      setDeleting(true);
      await patientApi.remove(id);
      toast.success('Patient deleted successfully');
      navigate('/patients');
    } catch (error) {
      toast.error(parseApiError(error));
    } finally {
      setDeleting(false);
      setConfirmDeleteOpen(false);
    }
  };

  const handlePrintOverallReport = async () => {
    const popup = window.open('', '_blank', 'width=1280,height=900');
    if (!popup) {
      toast.error('Please allow popups to print patient reports');
      return;
    }

    popup.document.write('<p style="font-family:Arial,sans-serif;padding:16px">Preparing report...</p>');

    try {
      setPrinting(true);
      const response = await reportApi.savePatientSummaryForPrint(id);
      const payload = response.data.data;
      const html = buildPatientReportPrintHtml({
        report: payload.report,
        snapshotId: payload.snapshotId,
        savedAt: payload.savedAt,
      });

      popup.document.open();
      popup.document.write(html);
      popup.document.close();
      popup.focus();
      setTimeout(() => popup.print(), 300);
      toast.success('Overall report saved and ready to print');
    } catch (error) {
      popup.close();
      toast.error(parseApiError(error));
    } finally {
      setPrinting(false);
    }
  };

  return (
    <div className="space-y-4">
      <PatientProfileHeader
        patient={patient}
        canManagePatient={canManagePatient}
        onDeletePatient={() => setConfirmDeleteOpen(true)}
        onPrintReport={handlePrintOverallReport}
        deleting={deleting}
        printing={printing}
      />
      <PatientSummaryCard
        patient={patient}
        latestRiskLevel={latestRiskLevel}
        lastVisitDate={lastVisitDate}
        nextFollowUpDate={nextFollowUpDate}
      />
      <PatientTabs patientId={id} />
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
        <h2 className="mb-2 text-lg font-semibold">Overview</h2>
        <div className="grid gap-3 text-sm md:grid-cols-3">
          <p>
            <span className="font-medium text-slate-700">Phone:</span> {patient.phone}
          </p>
          <p>
            <span className="font-medium text-slate-700">Address:</span> {patient.address || '-'}
          </p>
          <p>
            <span className="font-medium text-slate-700">Research Consent:</span> {patient.researchConsent ? 'Yes' : 'No'}
          </p>
        </div>
      </div>

      <ConfirmDialog
        open={confirmDeleteOpen}
        title="Delete Patient"
        message="This will permanently delete this patient record. Are you sure you want to continue?"
        onConfirm={handleDeletePatient}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </div>
  );
};

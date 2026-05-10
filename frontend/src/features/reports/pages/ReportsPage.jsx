import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { parseApiError } from '../../../api/apiErrorHandler';
import { reportApi } from '../api/reportApi';
import { DataTable } from '../../../shared/components/ui/DataTable';
import { Loader } from '../../../shared/components/ui/Loader';
import { formatDate } from '../../../shared/utils/formatDate';

export const ReportsPage = () => {
  const [loading, setLoading] = useState(true);
  const [monthly, setMonthly] = useState([]);
  const [followUps, setFollowUps] = useState([]);
  const [highRisk, setHighRisk] = useState([]);

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);
        const [monthlyRes, followUpsRes, highRiskRes] = await Promise.all([
          reportApi.monthly(),
          reportApi.followUp(),
          reportApi.highRiskPatients(),
        ]);

        setMonthly(monthlyRes.data.data || []);
        setFollowUps(followUpsRes.data.data || []);
        setHighRisk(highRiskRes.data.data || []);
      } catch (error) {
        toast.error(parseApiError(error));
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Reports</h1>

      <Section title="Monthly Report">
        <DataTable
          columns={[
            { key: 'month', label: 'Month' },
            { key: 'visitType', label: 'Visit Type' },
            { key: 'count', label: 'Count' },
          ]}
          rows={monthly}
          keyField="month"
        />
      </Section>

      <Section title="Follow-up Distribution">
        <DataTable
          columns={[
            { key: 'status', label: 'Status' },
            { key: 'count', label: 'Count' },
          ]}
          rows={followUps}
          keyField="status"
        />
      </Section>

      <Section title="High-Risk Patients">
        <DataTable
          columns={[
            { key: 'patient', label: 'Patient', render: (row) => row.patient?.fullName || '-' },
            { key: 'riskLevel', label: 'Risk Level' },
            { key: 'updatedAt', label: 'Last Updated', render: (row) => formatDate(row.updatedAt) },
          ]}
          rows={highRisk}
          keyField="_id"
        />
      </Section>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
    <h2 className="mb-3 text-base font-semibold text-slate-900">{title}</h2>
    {children}
  </div>
);

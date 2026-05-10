import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { toast } from 'sonner';
import { parseApiError } from '../../../api/apiErrorHandler';
import { dashboardApi } from '../api/dashboardApi';
import { StatCard } from '../components/StatCard';
import { ChartCard } from '../components/ChartCard';
import { Loader } from '../../../shared/components/ui/Loader';

export const DashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [trend, setTrend] = useState({ patientTrend: [], visitTrend: [] });
  const [diseaseDistribution, setDiseaseDistribution] = useState([]);
  const [riskDistribution, setRiskDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [summaryRes, trendRes, diseaseRes, riskRes] = await Promise.all([
          dashboardApi.summary(),
          dashboardApi.patientTrends(),
          dashboardApi.diseaseDistribution(),
          dashboardApi.riskDistribution(),
        ]);

        setSummary(summaryRes.data.data);
        setTrend(trendRes.data.data);
        setDiseaseDistribution(diseaseRes.data.data || []);
        setRiskDistribution(riskRes.data.data || []);
      } catch (error) {
        toast.error(parseApiError(error));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <Loader />;

  const statEntries = Object.entries(summary || {});

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {statEntries.map(([key, value]) => (
          <StatCard
            key={key}
            label={key
              .replace(/([a-z])([A-Z])/g, '$1 $2')
              .replace(/^./, (char) => char.toUpperCase())}
            value={value}
          />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Monthly Patient Trend">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trend.patientTrend || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#0891b2" name="Patients" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Visit Trend">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trend.visitTrend || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#0e7490" name="Visits" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Disease Distribution">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={diseaseDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} fill="#0891b2" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Risk Distribution">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="riskLevel" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#0f766e" name="Patients" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

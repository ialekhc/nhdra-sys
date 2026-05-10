import axiosClient from '../../../api/axiosClient';

export const dashboardApi = {
  summary: () => axiosClient.get('/dashboard/summary'),
  patientTrends: () => axiosClient.get('/dashboard/patient-trends'),
  diseaseDistribution: () => axiosClient.get('/dashboard/disease-distribution'),
  riskDistribution: () => axiosClient.get('/dashboard/risk-distribution'),
  followUpSummary: () => axiosClient.get('/dashboard/follow-up-summary'),
};

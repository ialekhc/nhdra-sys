import axiosClient from '../../../api/axiosClient';

export const reportApi = {
  monthly: () => axiosClient.get('/reports/monthly'),
  patientSummary: (patientId) => axiosClient.get('/reports/patient-summary', { params: { patientId } }),
  savePatientSummaryForPrint: (patientId) => axiosClient.post(`/reports/patient-summary/${patientId}/print`),
  latestSavedPatientSummary: (patientId) => axiosClient.get(`/reports/patient-summary/${patientId}/latest`),
  followUp: () => axiosClient.get('/reports/follow-up'),
  highRiskPatients: () => axiosClient.get('/reports/high-risk-patients'),
};

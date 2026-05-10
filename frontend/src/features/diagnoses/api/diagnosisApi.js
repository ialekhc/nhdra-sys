import axiosClient from '../../../api/axiosClient';

export const diagnosisApi = {
  create: (payload) => axiosClient.post('/diagnoses', payload),
  getById: (id) => axiosClient.get(`/diagnoses/${id}`),
  getByPatient: (patientId) => axiosClient.get(`/diagnoses/patient/${patientId}`),
  getByVisit: (visitId) => axiosClient.get(`/diagnoses/visit/${visitId}`),
  update: (id, payload) => axiosClient.put(`/diagnoses/${id}`, payload),

  createMedication: (payload) => axiosClient.post('/medications', payload),
  getMedicationsByPatient: (patientId) => axiosClient.get(`/medications/patient/${patientId}`),
};

import axiosClient from '../../../api/axiosClient';

export const clinicalRecordApi = {
  create: (payload) => axiosClient.post('/clinical-records', payload),
  getById: (id) => axiosClient.get(`/clinical-records/${id}`),
  getByPatient: (patientId) => axiosClient.get(`/clinical-records/patient/${patientId}`),
  getByVisit: (visitId) => axiosClient.get(`/clinical-records/visit/${visitId}`),
  update: (id, payload) => axiosClient.put(`/clinical-records/${id}`, payload),
};

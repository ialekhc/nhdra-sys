import axiosClient from '../../../api/axiosClient';

export const labResultApi = {
  create: (payload) => axiosClient.post('/lab-results', payload),
  getById: (id) => axiosClient.get(`/lab-results/${id}`),
  getByPatient: (patientId) => axiosClient.get(`/lab-results/patient/${patientId}`),
  getByVisit: (visitId) => axiosClient.get(`/lab-results/visit/${visitId}`),
  update: (id, payload) => axiosClient.put(`/lab-results/${id}`, payload),
  upload: (formData) => axiosClient.post('/lab-results/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

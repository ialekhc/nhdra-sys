import axiosClient from '../../../api/axiosClient';

export const visitApi = {
  list: (params) => axiosClient.get('/visits', { params }),
  create: (payload) => axiosClient.post('/visits', payload),
  getById: (id) => axiosClient.get(`/visits/${id}`),
  getByPatient: (patientId) => axiosClient.get(`/visits/patient/${patientId}`),
  update: (id, payload) => axiosClient.put(`/visits/${id}`, payload),
  updateStatus: (id, payload) => axiosClient.patch(`/visits/${id}/status`, payload),
};

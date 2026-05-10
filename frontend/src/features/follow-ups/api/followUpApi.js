import axiosClient from '../../../api/axiosClient';

export const followUpApi = {
  list: (params) => axiosClient.get('/follow-ups', { params }),
  create: (payload) => axiosClient.post('/follow-ups', payload),
  today: () => axiosClient.get('/follow-ups/today'),
  missed: () => axiosClient.get('/follow-ups/missed'),
  getByPatient: (patientId) => axiosClient.get(`/follow-ups/patient/${patientId}`),
  update: (id, payload) => axiosClient.put(`/follow-ups/${id}`, payload),
  updateStatus: (id, payload) => axiosClient.patch(`/follow-ups/${id}/status`, payload),
};

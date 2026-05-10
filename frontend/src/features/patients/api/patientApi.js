import axiosClient from '../../../api/axiosClient';

export const patientApi = {
  list: (params) => axiosClient.get('/patients', { params }),
  create: (payload) => axiosClient.post('/patients', payload),
  getById: (id) => axiosClient.get(`/patients/${id}`),
  update: (id, payload) => axiosClient.put(`/patients/${id}`, payload),
  archive: (id) => axiosClient.patch(`/patients/${id}/archive`),
  remove: (id) => axiosClient.delete(`/patients/${id}`),
  search: (query) => axiosClient.get('/patients/search', { params: { query } }),
};

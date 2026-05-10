import axiosClient from '../../../api/axiosClient';

export const userApi = {
  list: (params) => axiosClient.get('/users', { params }),
  create: (payload) => axiosClient.post('/users', payload),
  getById: (id) => axiosClient.get(`/users/${id}`),
  update: (id, payload) => axiosClient.put(`/users/${id}`, payload),
  updateStatus: (id, payload) => axiosClient.patch(`/users/${id}/status`, payload),
  remove: (id) => axiosClient.delete(`/users/${id}`),
};

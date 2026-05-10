import axiosClient from '../../../api/axiosClient';

export const authApi = {
  login: (payload) => axiosClient.post('/auth/login', payload),
  logout: () => axiosClient.post('/auth/logout'),
  me: () => axiosClient.get('/auth/me'),
  changePassword: (payload) => axiosClient.put('/auth/change-password', payload),
};

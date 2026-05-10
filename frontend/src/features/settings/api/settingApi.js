import axiosClient from '../../../api/axiosClient';

export const settingApi = {
  list: () => axiosClient.get('/settings'),
  update: (key, payload) => axiosClient.put(`/settings/${key}`, payload),
};

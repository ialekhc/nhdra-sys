import axiosClient from '../../../api/axiosClient';

export const auditLogApi = {
  list: (params) => axiosClient.get('/audit-logs', { params }),
};

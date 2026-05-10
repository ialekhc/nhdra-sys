import axiosClient from '../../../api/axiosClient';

export const researchApi = {
  dataset: (params) => axiosClient.get('/research/dataset', { params }),
  exportExcel: (params) => axiosClient.get('/research/export-excel', { params, responseType: 'blob' }),
  exportCsv: (params) => axiosClient.get('/research/export-csv', { params, responseType: 'blob' }),
  missingData: (params) => axiosClient.get('/research/missing-data-report', { params }),
};

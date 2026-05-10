const { sanitizeResearchData } = require('../../utils/sanitizeResearchData');
const { getResearchRecords } = require('./research.repository');
const { buildExcelPayload, buildCsvPayload } = require('./research.exporter');

const getDatasetService = async (query) => {
  const rows = await getResearchRecords(query);
  return rows.map(sanitizeResearchData);
};

const exportExcelService = async (query) => {
  const rows = await getDatasetService(query);
  return buildExcelPayload(rows);
};

const exportCsvService = async (query) => {
  const rows = await getDatasetService(query);
  return buildCsvPayload(rows);
};

const missingDataReportService = async (query) => {
  const rows = await getDatasetService(query);

  return rows
    .map((row) => {
      const missingFields = [];

      if (row.age === undefined || row.age === null) missingFields.push('age');
      if (!row.gender) missingFields.push('gender');
      if (!row.visitDate) missingFields.push('visitDate');
      if (row.systolicBP === undefined || row.systolicBP === null) missingFields.push('systolicBP');
      if (row.diastolicBP === undefined || row.diastolicBP === null) missingFields.push('diastolicBP');
      if (row.hba1c === undefined || row.hba1c === null) missingFields.push('hba1c');
      if (!row.riskLevel) missingFields.push('riskLevel');

      return {
        researchId: row.researchId,
        missingFields,
      };
    })
    .filter((item) => item.missingFields.length > 0);
};

module.exports = {
  getDatasetService,
  exportExcelService,
  exportCsvService,
  missingDataReportService,
};

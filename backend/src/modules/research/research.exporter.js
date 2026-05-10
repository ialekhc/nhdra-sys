const { exportExcel } = require('../../utils/exportExcel');
const { exportCsv } = require('../../utils/exportCsv');

const buildExcelPayload = (rows) => exportExcel(rows, 'DeidentifiedResearchData');
const buildCsvPayload = (rows) => exportCsv(rows);

module.exports = { buildExcelPayload, buildCsvPayload };

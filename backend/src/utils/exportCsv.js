const XLSX = require('xlsx');

const exportCsv = (rows) => {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  return XLSX.utils.sheet_to_csv(worksheet);
};

module.exports = { exportCsv };

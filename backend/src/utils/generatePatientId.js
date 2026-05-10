const generatePatientId = (sequence = 0) => {
  const year = new Date().getFullYear();
  return `PT-${year}-${String(sequence + 1).padStart(6, '0')}`;
};

module.exports = { generatePatientId };

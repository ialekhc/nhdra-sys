const generateResearchId = (sequence = 0) => {
  const year = new Date().getFullYear();
  return `RS-${year}-${String(sequence + 1).padStart(6, '0')}`;
};

module.exports = { generateResearchId };

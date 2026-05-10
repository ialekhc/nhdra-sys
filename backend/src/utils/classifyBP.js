const classifyBP = (systolicBP, diastolicBP) => {
  if (!systolicBP || !diastolicBP) return null;

  if (systolicBP < 120 && diastolicBP < 80) return 'Normal';
  if (systolicBP < 130 && diastolicBP < 80) return 'Elevated';
  if ((systolicBP >= 130 && systolicBP < 140) || (diastolicBP >= 80 && diastolicBP < 90)) {
    return 'Hypertension Stage 1';
  }
  if (systolicBP >= 140 || diastolicBP >= 90) return 'Hypertension Stage 2';
  if (systolicBP > 180 || diastolicBP > 120) return 'Hypertensive Crisis';
  return 'Unclassified';
};

module.exports = { classifyBP };

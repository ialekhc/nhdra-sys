const calculateBMI = (heightCm, weightKg) => {
  if (!heightCm || !weightKg) return null;
  const heightM = heightCm / 100;
  if (heightM <= 0) return null;
  return Number((weightKg / (heightM * heightM)).toFixed(2));
};

module.exports = { calculateBMI };

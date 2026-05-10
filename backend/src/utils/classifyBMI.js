const classifyBMI = (bmi) => {
  if (typeof bmi !== 'number') return null;
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

module.exports = { classifyBMI };

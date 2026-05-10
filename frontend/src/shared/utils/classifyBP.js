export const classifyBP = (systolic, diastolic) => {
  if (!systolic || !diastolic) return '-';
  if (systolic < 120 && diastolic < 80) return 'Normal';
  if (systolic < 130 && diastolic < 80) return 'Elevated';
  if ((systolic >= 130 && systolic < 140) || (diastolic >= 80 && diastolic < 90)) return 'Hypertension Stage 1';
  if (systolic >= 140 || diastolic >= 90) return 'Hypertension Stage 2';
  if (systolic > 180 || diastolic > 120) return 'Hypertensive Crisis';
  return 'Unclassified';
};

import { Badge } from '../../../shared/components/ui/Badge';

export const VitalsCard = ({ record }) => {
  if (!record) return null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
      <h3 className="mb-2 text-base font-semibold">Latest Vitals</h3>
      <div className="grid gap-2 text-sm md:grid-cols-3">
        <p>Height: {record.heightCm || '-'} cm</p>
        <p>Weight: {record.weightKg || '-'} kg</p>
        <p>BMI: {record.bmi || '-'} ({record.bmiCategory || '-'})</p>
        <p>BP: {record.systolicBP || '-'} / {record.diastolicBP || '-'}</p>
        <p>BP Category: {record.bpCategory || '-'}</p>
        <p>
          Diabetes: <Badge variant="info">{record.diabetesStatus || 'Unknown'}</Badge>
        </p>
      </div>
    </div>
  );
};

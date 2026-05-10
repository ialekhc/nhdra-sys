import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { diagnosisSchema } from '../schemas/diagnosisSchema';
import { Input } from '../../../shared/components/ui/Input';
import { Select } from '../../../shared/components/ui/Select';
import { Textarea } from '../../../shared/components/ui/Textarea';
import { Button } from '../../../shared/components/ui/Button';

export const DiagnosisForm = ({
  patientId,
  visitId,
  onSubmit,
  submitting,
  submitLabel = 'Save Diagnosis',
  submittingLabel = 'Saving...',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(diagnosisSchema),
    defaultValues: {
      patient: patientId,
      visit: visitId,
      diagnosisList: '',
      riskLevel: 'Moderate',
      treatmentPlan: '',
      doctorNotes: '',
      lifestyleAdvice: '',
      nextFollowUpDate: '',
    },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register('patient')} />
      <input type="hidden" {...register('visit')} />

      <div>
        <label className="mb-1 block text-sm font-medium">Diagnosis</label>
        <Input {...register('diagnosisList')} placeholder="e.g. Type 2 Diabetes Mellitus, Hypertension" />
        {errors.diagnosisList ? <p className="mt-1 text-xs text-red-600">{errors.diagnosisList.message}</p> : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Risk Level</label>
          <Select {...register('riskLevel')}>
            <option>Low</option>
            <option>Moderate</option>
            <option>High</option>
            <option>Critical</option>
          </Select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Next Follow-up Date</label>
          <Input type="date" {...register('nextFollowUpDate')} />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Treatment Plan</label>
        <Textarea {...register('treatmentPlan')} />
        {errors.treatmentPlan ? <p className="mt-1 text-xs text-red-600">{errors.treatmentPlan.message}</p> : null}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Doctor Notes</label>
        <Textarea {...register('doctorNotes')} />
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? submittingLabel : submitLabel}
      </Button>
    </form>
  );
};

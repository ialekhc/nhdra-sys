import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clinicalRecordSchema } from '../schemas/clinicalRecordSchema';
import { Input } from '../../../shared/components/ui/Input';
import { Select } from '../../../shared/components/ui/Select';
import { Textarea } from '../../../shared/components/ui/Textarea';
import { Button } from '../../../shared/components/ui/Button';

export const ClinicalRecordForm = ({
  patientId,
  visitId,
  onSubmit,
  submitting,
  submitLabel = 'Save Clinical Record',
  submittingLabel = 'Saving...',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(clinicalRecordSchema),
    defaultValues: {
      patient: patientId,
      visit: visitId,
      heightCm: '',
      weightKg: '',
      systolicBP: '',
      diastolicBP: '',
      pulse: '',
      diabetesStatus: 'Unknown',
      smokingStatus: 'Never',
      alcoholUse: 'No',
      physicalActivity: 'Moderate',
      remarks: '',
    },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register('patient')} />
      <input type="hidden" {...register('visit')} />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Height (cm)</label>
          <Input type="number" {...register('heightCm')} />
          {errors.heightCm ? <p className="mt-1 text-xs text-red-600">{errors.heightCm.message}</p> : null}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Weight (kg)</label>
          <Input type="number" {...register('weightKg')} />
          {errors.weightKg ? <p className="mt-1 text-xs text-red-600">{errors.weightKg.message}</p> : null}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Systolic BP</label>
          <Input type="number" {...register('systolicBP')} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Diastolic BP</label>
          <Input type="number" {...register('diastolicBP')} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Diabetes Status</label>
          <Select {...register('diabetesStatus')}>
            <option>No Diabetes</option>
            <option>Prediabetes</option>
            <option>Type 1</option>
            <option>Type 2</option>
            <option>Gestational</option>
            <option>Unknown</option>
          </Select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Smoking Status</label>
          <Select {...register('smokingStatus')}>
            <option>Never</option>
            <option>Former</option>
            <option>Current</option>
          </Select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Alcohol Use</label>
          <Select {...register('alcoholUse')}>
            <option>No</option>
            <option>Occasional</option>
            <option>Regular</option>
          </Select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Remarks</label>
        <Textarea {...register('remarks')} />
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? submittingLabel : submitLabel}
      </Button>
    </form>
  );
};

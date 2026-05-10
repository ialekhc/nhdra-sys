import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { medicationSchema } from '../schemas/diagnosisSchema';
import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';

export const MedicationForm = ({ patientId, visitId, onSubmit, submitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      patient: patientId,
      visit: visitId,
      drugName: '',
      dose: '',
      frequency: '',
      duration: '',
      instruction: '',
    },
  });

  const submitAndReset = async (values) => {
    await onSubmit(values);
    reset({ ...values, drugName: '', dose: '', frequency: '', duration: '', instruction: '' });
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(submitAndReset)}>
      <input type="hidden" {...register('patient')} />
      <input type="hidden" {...register('visit')} />

      <div className="grid gap-3 md:grid-cols-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Drug Name</label>
          <Input {...register('drugName')} />
          {errors.drugName ? <p className="mt-1 text-xs text-red-600">{errors.drugName.message}</p> : null}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Dose</label>
          <Input {...register('dose')} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Frequency</label>
          <Input {...register('frequency')} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Duration</label>
          <Input {...register('duration')} />
        </div>
      </div>

      <Button type="submit" variant="secondary" disabled={submitting}>
        Add Medication
      </Button>
    </form>
  );
};

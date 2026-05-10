import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { visitSchema } from '../schemas/visitSchema';
import { Input } from '../../../shared/components/ui/Input';
import { Select } from '../../../shared/components/ui/Select';
import { Textarea } from '../../../shared/components/ui/Textarea';
import { Button } from '../../../shared/components/ui/Button';
import { VISIT_TYPES } from '../../../constants/enums';

const VISIT_TYPE_LABELS = {
  New: 'New Patient',
  'Follow-up': 'Follow-up',
  Camp: 'Camp',
  Charity: 'Charity',
  Emergency: 'Emergency',
};

export const VisitForm = ({
  patientId,
  initialValues,
  onSubmit,
  submitting,
  submitLabel = 'Save Visit',
  submittingLabel = 'Saving...',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(visitSchema),
    defaultValues: {
      patient: patientId,
      visitDate: new Date().toISOString().slice(0, 10),
      visitType: 'New',
      chiefComplaint: '',
      department: '',
      symptoms: '',
      visitNotes: '',
      status: 'Open',
      ...(initialValues || {}),
    },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register('patient')} />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Visit Date</label>
          <Input type="date" {...register('visitDate')} />
          {errors.visitDate ? <p className="mt-1 text-xs text-red-600">{errors.visitDate.message}</p> : null}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Visit Type</label>
          <Select {...register('visitType')}>
            {VISIT_TYPES.map((type) => (
              <option key={type} value={type}>
                {VISIT_TYPE_LABELS[type] || type}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Chief Complaint</label>
        <Input {...register('chiefComplaint')} />
        {errors.chiefComplaint ? <p className="mt-1 text-xs text-red-600">{errors.chiefComplaint.message}</p> : null}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Symptoms (comma separated)</label>
        <Input {...register('symptoms')} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Visit Notes</label>
        <Textarea {...register('visitNotes')} />
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? submittingLabel : submitLabel}
      </Button>
    </form>
  );
};

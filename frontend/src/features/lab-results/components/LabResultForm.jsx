import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { labResultSchema } from '../schemas/labResultSchema';
import { Input } from '../../../shared/components/ui/Input';
import { Textarea } from '../../../shared/components/ui/Textarea';
import { Button } from '../../../shared/components/ui/Button';

export const LabResultForm = ({
  patientId,
  visitId,
  onSubmit,
  onUpload,
  submitting,
  submitLabel = 'Save Lab Result',
  submittingLabel = 'Saving...',
}) => {
  const [file, setFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(labResultSchema),
    defaultValues: {
      patient: patientId,
      visit: visitId,
      testDate: new Date().toISOString().slice(0, 10),
      fastingGlucose: '',
      postPrandialGlucose: '',
      hba1c: '',
      ldl: '',
      hdl: '',
      triglycerides: '',
      serumCreatinine: '',
      ecgFinding: '',
      remarks: '',
    },
  });

  const handleFormSubmit = async (values) => {
    let reportFileUrl;

    if (file && onUpload) {
      reportFileUrl = await onUpload(file);
    }

    await onSubmit({
      ...values,
      reportFileUrl,
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
      <input type="hidden" {...register('patient')} />
      <input type="hidden" {...register('visit')} />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Test Date</label>
          <Input type="date" {...register('testDate')} />
          {errors.testDate ? <p className="mt-1 text-xs text-red-600">{errors.testDate.message}</p> : null}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">HbA1c</label>
          <Input type="number" step="0.1" {...register('hba1c')} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Fasting Glucose</label>
          <Input type="number" {...register('fastingGlucose')} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Post Prandial Glucose</label>
          <Input type="number" {...register('postPrandialGlucose')} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">LDL</label>
          <Input type="number" {...register('ldl')} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">HDL</label>
          <Input type="number" {...register('hdl')} />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">ECG Finding</label>
        <Input {...register('ecgFinding')} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Upload Report (PDF/JPG/PNG)</label>
        <Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFile(e.target.files?.[0] || null)} />
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

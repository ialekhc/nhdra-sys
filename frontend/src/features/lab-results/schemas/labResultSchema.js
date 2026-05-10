import { z } from 'zod';

export const labResultSchema = z.object({
  patient: z.string().min(1),
  visit: z.string().min(1),
  testDate: z.string().min(1, 'Test date is required'),
  fastingGlucose: z.coerce.number().optional(),
  postPrandialGlucose: z.coerce.number().optional(),
  hba1c: z.coerce.number().optional(),
  ldl: z.coerce.number().optional(),
  hdl: z.coerce.number().optional(),
  triglycerides: z.coerce.number().optional(),
  serumCreatinine: z.coerce.number().optional(),
  ecgFinding: z.string().optional(),
  remarks: z.string().optional(),
});

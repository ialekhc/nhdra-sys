import { z } from 'zod';

export const clinicalRecordSchema = z.object({
  patient: z.string().min(1),
  visit: z.string().min(1),
  heightCm: z.coerce.number().min(30),
  weightKg: z.coerce.number().min(1),
  systolicBP: z.coerce.number().min(40),
  diastolicBP: z.coerce.number().min(30),
  pulse: z.coerce.number().optional(),
  diabetesStatus: z.string().optional(),
  smokingStatus: z.string().optional(),
  alcoholUse: z.string().optional(),
  physicalActivity: z.string().optional(),
  remarks: z.string().optional(),
});

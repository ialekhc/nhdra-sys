import { z } from 'zod';

export const diagnosisSchema = z
  .object({
    patient: z.string().min(1),
    visit: z.string().min(1),
    diagnosisList: z.string().min(1, 'Diagnosis is required'),
    riskLevel: z.enum(['Low', 'Moderate', 'High', 'Critical']),
    treatmentPlan: z.string().optional(),
    doctorNotes: z.string().optional(),
    lifestyleAdvice: z.string().optional(),
    nextFollowUpDate: z.string().optional(),
  })
  .refine((value) => value.treatmentPlan || value.doctorNotes, {
    path: ['treatmentPlan'],
    message: 'Treatment plan or doctor notes is required',
  });

export const medicationSchema = z.object({
  patient: z.string().min(1),
  visit: z.string().min(1),
  drugName: z.string().min(1, 'Drug name is required'),
  dose: z.string().optional(),
  frequency: z.string().optional(),
  duration: z.string().optional(),
  instruction: z.string().optional(),
});

import { z } from 'zod';

export const followUpSchema = z.object({
  patient: z.string().min(1),
  visit: z.string().optional(),
  followUpDate: z.string().min(1, 'Follow-up date is required'),
  status: z.enum(['Pending', 'Completed', 'Missed', 'Rescheduled', 'Lost to follow-up']),
  patientResponse: z.string().optional(),
  nextAction: z.string().optional(),
  remarks: z.string().optional(),
});

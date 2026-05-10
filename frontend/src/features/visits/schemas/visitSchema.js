import { z } from 'zod';
import { VISIT_TYPES } from '../../../constants/enums';

export const visitSchema = z.object({
  patient: z.string().min(1, 'Patient is required'),
  visitDate: z.string().min(1, 'Visit date is required'),
  visitType: z.enum(VISIT_TYPES),
  chiefComplaint: z.string().min(2, 'Chief complaint is required'),
  department: z.string().optional(),
  assignedDoctor: z.string().optional(),
  symptoms: z.string().optional(),
  visitNotes: z.string().optional(),
  status: z.enum(['Open', 'Completed', 'Cancelled']).optional(),
});

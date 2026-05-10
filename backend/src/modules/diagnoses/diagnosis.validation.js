const { z } = require('zod');

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);

const diagnosisBodyBaseSchema = z.object({
  patient: objectIdSchema,
  visit: objectIdSchema,
  diagnosisList: z.array(z.string().min(2)).min(1),
  icdCodes: z.array(z.string()).optional(),
  riskLevel: z.enum(['Low', 'Moderate', 'High', 'Critical']),
  treatmentPlan: z.string().optional(),
  lifestyleAdvice: z.string().optional(),
  doctorNotes: z.string().optional(),
  outcome: z.string().optional(),
  nextFollowUpDate: z.string().datetime().optional(),
  doctor: objectIdSchema.optional(),
});

const diagnosisBodySchema = diagnosisBodyBaseSchema.refine((data) => data.treatmentPlan || data.doctorNotes, {
  path: ['treatmentPlan'],
  message: 'Either treatmentPlan or doctorNotes is required',
});

const createDiagnosisSchema = z.object({
  body: diagnosisBodySchema,
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const updateDiagnosisSchema = z.object({
  body: diagnosisBodyBaseSchema.partial(),
  params: z.object({ id: objectIdSchema }),
  query: z.object({}).optional(),
});

const idParamSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({ id: objectIdSchema }),
  query: z.object({}).optional(),
});

const patientParamSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({ patientId: objectIdSchema }),
  query: z.object({}).optional(),
});

const visitParamSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({ visitId: objectIdSchema }),
  query: z.object({}).optional(),
});

module.exports = {
  createDiagnosisSchema,
  updateDiagnosisSchema,
  idParamSchema,
  patientParamSchema,
  visitParamSchema,
};

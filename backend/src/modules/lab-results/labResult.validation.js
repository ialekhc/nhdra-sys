const { z } = require('zod');

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);

const labResultBodySchema = z.object({
  patient: objectIdSchema,
  visit: objectIdSchema,
  fastingGlucose: z.number().min(0).optional(),
  postPrandialGlucose: z.number().min(0).optional(),
  randomGlucose: z.number().min(0).optional(),
  hba1c: z.number().min(0).max(30).optional(),

  totalCholesterol: z.number().min(0).optional(),
  ldl: z.number().min(0).optional(),
  hdl: z.number().min(0).optional(),
  triglycerides: z.number().min(0).optional(),

  serumCreatinine: z.number().min(0).optional(),
  egfr: z.number().min(0).optional(),
  uacr: z.number().min(0).optional(),

  ecgFinding: z.string().optional(),
  echoFinding: z.string().optional(),
  ejectionFraction: z.number().min(0).max(100).optional(),
  troponin: z.number().min(0).optional(),

  hemoglobin: z.number().min(0).optional(),
  urineRoutine: z.string().optional(),
  reportFileUrl: z.string().optional(),
  remarks: z.string().optional(),
  testDate: z.string().datetime(),
});

const createLabResultSchema = z.object({
  body: labResultBodySchema,
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const updateLabResultSchema = z.object({
  body: labResultBodySchema.partial(),
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
  createLabResultSchema,
  updateLabResultSchema,
  idParamSchema,
  patientParamSchema,
  visitParamSchema,
};

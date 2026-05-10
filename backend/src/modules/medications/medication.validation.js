const { z } = require('zod');

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);

const medicationBodySchema = z.object({
  patient: objectIdSchema,
  visit: objectIdSchema,
  drugName: z.string().min(1),
  dose: z.string().optional(),
  frequency: z.string().optional(),
  duration: z.string().optional(),
  instruction: z.string().optional(),
  prescribedBy: objectIdSchema.optional(),
});

const createMedicationSchema = z.object({
  body: medicationBodySchema,
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const updateMedicationSchema = z.object({
  body: medicationBodySchema.partial(),
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

const idParamSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({ id: objectIdSchema }),
  query: z.object({}).optional(),
});

module.exports = {
  createMedicationSchema,
  updateMedicationSchema,
  patientParamSchema,
  visitParamSchema,
  idParamSchema,
};

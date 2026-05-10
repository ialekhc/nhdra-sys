const { z } = require('zod');

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);

const patientSummaryQuerySchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({ patientId: objectIdSchema }),
});

const patientIdParamSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({ patientId: objectIdSchema }),
  query: z.object({}).optional(),
});

module.exports = {
  patientSummaryQuerySchema,
  patientIdParamSchema,
};

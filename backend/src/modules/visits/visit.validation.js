const { z } = require('zod');

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);

const createVisitSchema = z.object({
  body: z.object({
    patient: objectIdSchema,
    visitDate: z.string().datetime(),
    visitType: z.enum(['New', 'Follow-up', 'Emergency']),
    department: z.string().optional(),
    assignedDoctor: objectIdSchema.optional(),
    chiefComplaint: z.string().min(2),
    symptoms: z.array(z.string()).optional(),
    visitNotes: z.string().optional(),
    status: z.enum(['Open', 'Completed', 'Cancelled']).optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const updateVisitSchema = z.object({
  body: z.object({
    visitDate: z.string().datetime().optional(),
    visitType: z.enum(['New', 'Follow-up', 'Emergency']).optional(),
    department: z.string().optional(),
    assignedDoctor: objectIdSchema.optional(),
    chiefComplaint: z.string().min(2).optional(),
    symptoms: z.array(z.string()).optional(),
    visitNotes: z.string().optional(),
    status: z.enum(['Open', 'Completed', 'Cancelled']).optional(),
  }),
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

const statusUpdateSchema = z.object({
  body: z.object({ status: z.enum(['Open', 'Completed', 'Cancelled']) }),
  params: z.object({ id: objectIdSchema }),
  query: z.object({}).optional(),
});

module.exports = {
  createVisitSchema,
  updateVisitSchema,
  idParamSchema,
  patientParamSchema,
  statusUpdateSchema,
};

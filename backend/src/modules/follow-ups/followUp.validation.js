const { z } = require('zod');

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);

const followUpStatusEnum = z.enum(['Pending', 'Completed', 'Missed', 'Rescheduled', 'Lost to follow-up']);

const followUpBodySchema = z.object({
  patient: objectIdSchema,
  visit: objectIdSchema.optional(),
  followUpDate: z.string().datetime(),
  status: followUpStatusEnum,
  calledBy: objectIdSchema.optional(),
  callDate: z.string().datetime().optional(),
  patientResponse: z.string().optional(),
  nextAction: z.string().optional(),
  remarks: z.string().optional(),
});

const createFollowUpSchema = z.object({
  body: followUpBodySchema,
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const updateFollowUpSchema = z.object({
  body: followUpBodySchema.partial(),
  params: z.object({ id: objectIdSchema }),
  query: z.object({}).optional(),
});

const updateFollowUpStatusSchema = z.object({
  body: z.object({ status: followUpStatusEnum }),
  params: z.object({ id: objectIdSchema }),
  query: z.object({}).optional(),
});

const patientParamSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({ patientId: objectIdSchema }),
  query: z.object({}).optional(),
});

module.exports = {
  createFollowUpSchema,
  updateFollowUpSchema,
  updateFollowUpStatusSchema,
  patientParamSchema,
};

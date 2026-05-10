const { z } = require('zod');

const updateSettingSchema = z.object({
  body: z.object({ value: z.any() }),
  params: z.object({ key: z.string().min(1) }),
  query: z.object({}).optional(),
});

module.exports = { updateSettingSchema };

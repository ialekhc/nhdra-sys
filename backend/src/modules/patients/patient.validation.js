const { z } = require('zod');

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);

const createPatientSchema = z.object({
  body: z
    .object({
      fullName: z.string().min(2),
      dateOfBirth: z.string().datetime().optional(),
      age: z.number().min(0).max(130).optional(),
      gender: z.enum(['Male', 'Female', 'Other']),
      phone: z.string().min(5),
      address: z.string().optional(),
      wardNumber: z.string().optional(),
      district: z.string().optional(),
      province: z.string().optional(),
      occupation: z.string().optional(),
      maritalStatus: z.string().optional(),
      emergencyContactName: z.string().optional(),
      emergencyContactPhone: z.string().optional(),
      referredBy: z.string().optional(),
      treatmentConsent: z.boolean(),
      researchConsent: z.boolean().optional(),
    })
    .refine((data) => data.age !== undefined || data.dateOfBirth, {
      message: 'Either age or dateOfBirth is required',
      path: ['age'],
    }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const updatePatientSchema = z.object({
  body: z.object({
    fullName: z.string().min(2).optional(),
    dateOfBirth: z.string().datetime().optional(),
    age: z.number().min(0).max(130).optional(),
    gender: z.enum(['Male', 'Female', 'Other']).optional(),
    phone: z.string().min(5).optional(),
    address: z.string().optional(),
    wardNumber: z.string().optional(),
    district: z.string().optional(),
    province: z.string().optional(),
    occupation: z.string().optional(),
    maritalStatus: z.string().optional(),
    emergencyContactName: z.string().optional(),
    emergencyContactPhone: z.string().optional(),
    referredBy: z.string().optional(),
    treatmentConsent: z.boolean().optional(),
    researchConsent: z.boolean().optional(),
    status: z.enum(['active', 'archived']).optional(),
  }),
  params: z.object({ id: objectIdSchema }),
  query: z.object({}).optional(),
});

const idParamSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({ id: objectIdSchema }),
  query: z.object({}).optional(),
});

const searchPatientSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({ query: z.string().min(1) }),
});

module.exports = {
  createPatientSchema,
  updatePatientSchema,
  idParamSchema,
  searchPatientSchema,
};

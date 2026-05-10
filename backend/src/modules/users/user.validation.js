const { z } = require('zod');
const { ROLES } = require('../../constants/roles');

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(Object.values(ROLES)),
    phone: z.string().optional(),
    department: z.string().optional(),
    status: z.enum(['active', 'inactive']).optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).optional(),
    role: z.enum(Object.values(ROLES)).optional(),
    phone: z.string().optional(),
    department: z.string().optional(),
  }),
  params: z.object({ id: objectIdSchema }),
  query: z.object({}).optional(),
});

const updateUserStatusSchema = z.object({
  body: z.object({ status: z.enum(['active', 'inactive']) }),
  params: z.object({ id: objectIdSchema }),
  query: z.object({}).optional(),
});

const idParamSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({ id: objectIdSchema }),
  query: z.object({}).optional(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  updateUserStatusSchema,
  idParamSchema,
};

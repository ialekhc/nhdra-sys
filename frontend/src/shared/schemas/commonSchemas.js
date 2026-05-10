import { z } from 'zod';

export const objectIdSchema = z.string().min(24).max(24);
export const requiredStringSchema = z.string().trim().min(1, 'Required');

import { z } from 'zod';
import { getDistrictsByProvince } from '../../../constants/nepalLocations';

export const patientSchema = z
  .object({
    fullName: z.string().min(2, 'Full name is required'),
    dateOfBirth: z.string().optional(),
    age: z
      .union([z.string().transform((value) => (value ? Number(value) : undefined)), z.number(), z.undefined()])
      .optional(),
    gender: z.enum(['Male', 'Female', 'Other']),
    phone: z.string().min(5, 'Phone is required'),
    address: z.string().optional(),
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
  .refine((value) => value.age || value.dateOfBirth, {
    message: 'Age or date of birth is required',
    path: ['age'],
  })
  .refine((value) => {
    if (!value.district) return true;
    if (!value.province) return false;
    return getDistrictsByProvince(value.province).includes(value.district);
  }, {
    message: 'District must match selected province',
    path: ['district'],
  });

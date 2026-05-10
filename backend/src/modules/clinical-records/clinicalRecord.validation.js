const { z } = require('zod');

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);

const clinicalBodySchema = z.object({
  patient: objectIdSchema,
  visit: objectIdSchema,
  heightCm: z.number().min(30).max(300),
  weightKg: z.number().min(1).max(500),
  waistCircumferenceCm: z.number().min(0).max(300).optional(),
  systolicBP: z.number().min(40).max(300),
  diastolicBP: z.number().min(30).max(200),
  pulse: z.number().min(0).max(300).optional(),
  temperature: z.number().min(30).max(45).optional(),
  spo2: z.number().min(0).max(100).optional(),
  respiratoryRate: z.number().min(0).max(100).optional(),

  diabetesStatus: z.enum(['No Diabetes', 'Prediabetes', 'Type 1', 'Type 2', 'Gestational', 'Unknown']).optional(),
  diabetesDurationYears: z.number().min(0).max(100).optional(),
  currentDiabetesMedication: z.string().optional(),
  insulinUse: z.boolean().optional(),

  hypertension: z.boolean().optional(),
  coronaryArteryDisease: z.boolean().optional(),
  chestPain: z.boolean().optional(),
  heartFailure: z.boolean().optional(),
  strokeHistory: z.boolean().optional(),

  chronicKidneyDisease: z.boolean().optional(),
  proteinuria: z.boolean().optional(),

  smokingStatus: z.enum(['Never', 'Former', 'Current']).optional(),
  alcoholUse: z.enum(['No', 'Occasional', 'Regular']).optional(),
  physicalActivity: z.enum(['Low', 'Moderate', 'High']).optional(),
  dietPattern: z.string().optional(),

  familyHistoryDiabetes: z.boolean().optional(),
  familyHistoryHypertension: z.boolean().optional(),
  familyHistoryHeartDisease: z.boolean().optional(),
  allergies: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  remarks: z.string().optional(),
});

const createClinicalRecordSchema = z.object({
  body: clinicalBodySchema,
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const updateClinicalRecordSchema = z.object({
  body: clinicalBodySchema.partial(),
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
  createClinicalRecordSchema,
  updateClinicalRecordSchema,
  idParamSchema,
  patientParamSchema,
  visitParamSchema,
};

import { z } from 'zod';

export const basicInfoSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Phone number seems too short').max(20, 'Phone number seems too long'),
  farmName: z
    .string()
    .min(2, 'Farm name must be at least 2 characters')
    .max(120, 'Farm name must be at most 120 characters'),
});

export const farmDetailsSchema = z.object({
  location: z.object({
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State/Province is required'),
    country: z.string().min(2, 'Country is required'),
  }),
  productTypes: z
    .array(z.string().min(1))
    .min(1, 'Select at least one product type')
    .max(10, 'Too many product types'),
  farmingMethod: z.enum(['organic', 'conventional', 'hydroponic', 'other']),
});

export const accountSetupSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must include an uppercase letter')
    .regex(/[a-z]/, 'Must include a lowercase letter')
    .regex(/[0-9]/, 'Must include a number'),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, { message: 'You must agree to the terms' }),
  // Anti-spam honeypot field. Must be empty.
  website: z.string().optional().default(''),
});

export const farmerSubscriptionSchema = basicInfoSchema
  .and(farmDetailsSchema)
  .and(accountSetupSchema);

export type FarmerSubscriptionData = z.infer<typeof farmerSubscriptionSchema>;

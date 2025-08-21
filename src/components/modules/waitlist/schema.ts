import { z } from 'zod';

export const waitlistFormSchema = z.object({
  name: z.string().optional(),
  email: z
    .string()
    .transform((val) => val.trim().toLowerCase())
    .pipe(
      z.string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address')
    ),
  role: z.enum(['farmer', 'investor', 'consumer', 'partner', 'other']).optional(),
  consent: z
    .boolean()
    .refine((val) => val === true, 'You must agree to receive updates to continue'),
});

export type WaitlistFormValues = z.infer<typeof waitlistFormSchema>;
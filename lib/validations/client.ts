import { z } from 'zod';

export const clientFormSchema = z.object({
  type: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'GOVERNMENT', 'INDUSTRIAL']),
  companyName: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  alternatePhone: z.string().optional(),
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().length(2, 'State must be 2 characters'),
    zip: z.string().min(5, 'ZIP code is required'),
  }),
  source: z.enum(['WEBSITE', 'REFERRAL', 'SOCIAL_MEDIA', 'COLD_OUTREACH', 'REPEAT_CLIENT', 'OTHER']),
  status: z.enum(['LEAD', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'ACTIVE_CLIENT', 'COMPLETED', 'LOST']),
});

// Schema for updating clients - all fields are optional
export const clientUpdateSchema = z.object({
  type: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'GOVERNMENT', 'INDUSTRIAL']).optional(),
  companyName: z.string().optional(),
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().min(10, 'Phone number is required').optional(),
  alternatePhone: z.string().optional(),
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().length(2, 'State must be 2 characters'),
    zip: z.string().min(5, 'ZIP code is required'),
  }).optional(),
  source: z.enum(['WEBSITE', 'REFERRAL', 'SOCIAL_MEDIA', 'COLD_OUTREACH', 'REPEAT_CLIENT', 'OTHER']).optional(),
  status: z.enum(['LEAD', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'ACTIVE_CLIENT', 'COMPLETED', 'LOST']).optional(),
});

export type ClientFormData = z.infer<typeof clientFormSchema>;
export type ClientUpdateData = z.infer<typeof clientUpdateSchema>;
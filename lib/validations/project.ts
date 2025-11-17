import { z } from 'zod';

export const projectFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum(['COMMUNICATIONS', 'CONSTRUCTION', 'BOTH'], {
    required_error: 'Category is required',
  }),
  status: z.enum(['DRAFT', 'PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'ARCHIVED', 'CANCELLED']).default('DRAFT'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  clientId: z.string().min(1, 'Client is required'),
  managerId: z.string().min(1, 'Manager is required'),
  location: z.object({
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().length(2, 'State must be 2 characters'),
    zip: z.string().min(5, 'ZIP code is required'),
    lat: z.number().optional(),
    lng: z.number().optional(),
  }),
  startDate: z.coerce.date({
    required_error: 'Start date is required',
  }),
  endDate: z.coerce.date().optional().nullable(),
  estimatedEndDate: z.coerce.date().optional().nullable(),
  budgetAmount: z.coerce.number().positive('Budget must be positive').optional().nullable(),
  actualCost: z.coerce.number().positive('Actual cost must be positive').optional().nullable(),
  services: z.array(z.string()).min(1, 'Select at least one service'),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const projectUpdateSchema = projectFormSchema.partial().extend({
  slug: z.string().optional(),
  publishedAt: z.coerce.date().optional().nullable(),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;
export type ProjectUpdateData = z.infer<typeof projectUpdateSchema>;

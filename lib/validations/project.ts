import { z } from 'zod';

export const projectFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum(['COMMUNICATIONS', 'CONSTRUCTION', 'BOTH']),
  status: z.enum(['DRAFT', 'PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'ARCHIVED', 'CANCELLED']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  clientId: z.string().min(1, 'Client is required'),
  location: z.object({
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().length(2, 'State must be 2 characters'),
    zip: z.string().min(5, 'ZIP code is required'),
  }),
  startDate: z.date(),
  endDate: z.date().optional().nullable(),
  budgetAmount: z.number().positive().optional().nullable(),
  services: z.array(z.string()).min(1, 'Select at least one service'),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;
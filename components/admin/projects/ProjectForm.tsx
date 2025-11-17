'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import {
  Save,
  X,
  Upload,
  Calendar,
  DollarSign,
  MapPin,
  User,
  FileText,
  Tag,
  Loader2,
} from 'lucide-react';
import ImageUploader from './ImageUploader';

// Validation schema
const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum(['COMMUNICATIONS', 'CONSTRUCTION', 'BOTH']),
  status: z.enum(['DRAFT', 'PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'ARCHIVED']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  clientId: z.string().min(1, 'Please select a client'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().length(2, 'State must be 2 characters (e.g., CA)'),
  zip: z.string().min(5, 'ZIP code is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  budgetAmount: z.string().optional(),
  services: z.array(z.string()).min(1, 'Select at least one service'),
  tags: z.string().optional(),
  featured: z.boolean().default(false),
  publishedAt: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  clients: Array<{
    id: string;
    firstName: string;
    lastName: string;
    companyName?: string;
  }>;
  initialData?: any;
  isEdit?: boolean;
}

const AVAILABLE_SERVICES = [
  // Communications
  'Network Infrastructure',
  'Fiber Optic Installation',
  'Data Center Setup',
  '5G Installation',
  'Wireless Solutions',
  'DAS Systems',
  'Structured Cabling',
  // Construction
  'Site Development',
  'Excavation & Grading',
  'Concrete Work',
  'Foundation Construction',
  'Infrastructure Development',
  'Utility Installation',
  'Demolition',
  'Equipment Transport',
];

export default function ProjectForm({
  clients,
  initialData,
  isEdit = false,
}: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>(
    initialData?.images?.map((img: any) => img.url) || []
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          category: initialData.category,
          status: initialData.status,
          priority: initialData.priority,
          clientId: initialData.clientId,
          address: initialData.location.address,
          city: initialData.location.city,
          state: initialData.location.state,
          zip: initialData.location.zip,
          startDate: new Date(initialData.startDate)
            .toISOString()
            .split('T')[0],
          endDate: initialData.endDate
            ? new Date(initialData.endDate).toISOString().split('T')[0]
            : '',
          budgetAmount: initialData.budgetAmount
            ? initialData.budgetAmount.toString()
            : '',
          services: initialData.services || [],
          tags: initialData.tags?.join(', ') || '',
          featured: initialData.featured || false,
          publishedAt: initialData.publishedAt
            ? new Date(initialData.publishedAt).toISOString().split('T')[0]
            : '',
        }
      : {
          status: 'DRAFT',
          priority: 'MEDIUM',
          category: 'BOTH',
          services: [],
          featured: false,
        },
  });

  const selectedServices = watch('services') || [];
  const status = watch('status');
  const category = watch('category');

  // Toggle service selection
  const toggleService = (service: string) => {
    const current = selectedServices;
    if (current.includes(service)) {
      setValue(
        'services',
        current.filter((s) => s !== service)
      );
    } else {
      setValue('services', [...current, service]);
    }
  };

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Handle form submission
  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);

    try {
      const slug = isEdit ? initialData.slug : generateSlug(data.title);

      const payload = {
        title: data.title,
        slug,
        description: data.description,
        category: data.category,
        status: data.status,
        priority: data.priority,
        clientId: data.clientId,
        location: {
          address: data.address,
          city: data.city,
          state: data.state,
          zip: data.zip,
        },
        startDate: new Date(data.startDate).toISOString(),
        endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
        budgetAmount: data.budgetAmount ? parseFloat(data.budgetAmount) : null,
        services: data.services,
        tags: data.tags ? data.tags.split(',').map((t) => t.trim()) : [],
        featured: data.featured,
        publishedAt:
          data.status === 'COMPLETED' && data.publishedAt
            ? new Date(data.publishedAt).toISOString()
            : null,
        images: uploadedImages,
      };

      const url = isEdit
        ? `/api/projects/${initialData.id}`
        : '/api/projects';

      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save project');
      }

      const result = await response.json();
      router.push(`/admin/projects/${result.id}`);
      router.refresh();
    } catch (error: any) {
      alert(error.message || 'Failed to save project');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'Edit Project' : 'Create New Project'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEdit ? 'Update project details' : 'Add a new project to your portfolio'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Title *
            </label>
            <input
              {...register('title')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              placeholder="Oregon AV Charging Infrastructure"
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              placeholder="Comprehensive description of the project..."
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              {...register('category')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
            >
              <option value="BOTH">Both</option>
              <option value="COMMUNICATIONS">Communications</option>
              <option value="CONSTRUCTION">Construction</option>
            </select>
            {errors.category && (
              <p className="text-red-600 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Client */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client *
            </label>
            <select
              {...register('clientId')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
            >
              <option value="">Select a client...</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.companyName ||
                    `${client.firstName} ${client.lastName}`}
                </option>
              ))}
            </select>
            {errors.clientId && (
              <p className="text-red-600 text-sm mt-1">
                {errors.clientId.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              {...register('status')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
            >
              <option value="DRAFT">Draft</option>
              <option value="PLANNING">Planning</option>
              <option value="ACTIVE">Active</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="COMPLETED">Completed</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority *
            </label>
            <select
              {...register('priority')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Location
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address *
            </label>
            <input
              {...register('address')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              placeholder="123 Main Street"
            />
            {errors.address && (
              <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              {...register('city')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              placeholder="San Jose"
            />
            {errors.city && (
              <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <input
              {...register('state')}
              type="text"
              maxLength={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent uppercase"
              placeholder="CA"
            />
            {errors.state && (
              <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ZIP Code *
            </label>
            <input
              {...register('zip')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              placeholder="95125"
            />
            {errors.zip && (
              <p className="text-red-600 text-sm mt-1">{errors.zip.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Timeline & Budget */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Timeline & Budget
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date *
            </label>
            <input
              {...register('startDate')}
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
            />
            {errors.startDate && (
              <p className="text-red-600 text-sm mt-1">
                {errors.startDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              {...register('endDate')}
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                {...register('budgetAmount')}
                type="number"
                step="0.01"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                placeholder="50000.00"
              />
            </div>
          </div>

          {status === 'COMPLETED' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Published Date
              </label>
              <input
                {...register('publishedAt')}
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              />
            </div>
          )}
        </div>
      </div>

      {/* Services */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Tag className="w-5 h-5" />
          Services Provided *
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {AVAILABLE_SERVICES.map((service) => (
            <button
              key={service}
              type="button"
              onClick={() => toggleService(service)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  selectedServices.includes(service)
                    ? 'bg-gold-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {service}
            </button>
          ))}
        </div>
        {errors.services && (
          <p className="text-red-600 text-sm mt-2">{errors.services.message}</p>
        )}
      </div>

      {/* Images */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Project Images
        </h2>
        <ImageUploader
          images={uploadedImages}
          onImagesChange={setUploadedImages}
          projectId={initialData?.id}
        />
      </div>

      {/* Additional Options */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Additional Options
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              {...register('tags')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              placeholder="infrastructure, communications, fiber-optic"
            />
          </div>

          <div className="flex items-center">
            <input
              {...register('featured')}
              type="checkbox"
              id="featured"
              className="w-4 h-4 text-gold-600 border-gray-300 rounded focus:ring-gold-500"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
              Feature this project on the homepage
            </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              {isEdit ? 'Update Project' : 'Create Project'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
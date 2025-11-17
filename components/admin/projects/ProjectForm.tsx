'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectFormSchema, ProjectFormData } from '@/lib/validations/project';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from './ImageUploader';

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData>;
  projectId?: string;
  clients: Array<{ id: string; firstName: string; lastName: string; companyName?: string }>;
  managers: Array<{ id: string; name: string; email: string }>;
}

export default function ProjectForm({
  initialData,
  projectId,
  clients,
  managers,
}: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: initialData || {
      status: 'DRAFT',
      priority: 'MEDIUM',
      featured: false,
      services: [],
      tags: [],
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const url = projectId
        ? `/api/admin/projects/${projectId}`
        : '/api/admin/projects';
      const method = projectId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save project');
      }

      const project = await response.json();

      // Upload images if any
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((image) => {
          formData.append('files', image);
        });
        formData.append('projectId', project.id);

        await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });
      }

      router.push('/admin/projects');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            {...register('title')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description *
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              {...register('category')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
            >
              <option value="">Select category</option>
              <option value="COMMUNICATIONS">Communications</option>
              <option value="CONSTRUCTION">Construction</option>
              <option value="BOTH">Both</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              {...register('status')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
            >
              <option value="DRAFT">Draft</option>
              <option value="PLANNING">Planning</option>
              <option value="ACTIVE">Active</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="COMPLETED">Completed</option>
              <option value="ARCHIVED">Archived</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              {...register('priority')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Client & Manager */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Client & Team</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Client *
            </label>
            <select
              {...register('clientId')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
            >
              <option value="">Select client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.companyName || `${client.firstName} ${client.lastName}`}
                </option>
              ))}
            </select>
            {errors.clientId && (
              <p className="mt-1 text-sm text-red-600">{errors.clientId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Manager *
            </label>
            <select
              {...register('managerId')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
            >
              <option value="">Select manager</option>
              {managers.map((manager) => (
                <option key={manager.id} value={manager.id}>
                  {manager.name}
                </option>
              ))}
            </select>
            {errors.managerId && (
              <p className="mt-1 text-sm text-red-600">{errors.managerId.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Location</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Address *
            </label>
            <input
              {...register('location.address')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
            />
            {errors.location?.address && (
              <p className="mt-1 text-sm text-red-600">{errors.location.address.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City *
            </label>
            <input
              {...register('location.city')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
            />
            {errors.location?.city && (
              <p className="mt-1 text-sm text-red-600">{errors.location.city.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State *
              </label>
              <input
                {...register('location.state')}
                type="text"
                maxLength={2}
                placeholder="CA"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
              />
              {errors.location?.state && (
                <p className="mt-1 text-sm text-red-600">{errors.location.state.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                ZIP *
              </label>
              <input
                {...register('location.zip')}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
              />
              {errors.location?.zip && (
                <p className="mt-1 text-sm text-red-600">{errors.location.zip.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline & Budget */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Timeline & Budget</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date *
            </label>
            <input
              {...register('startDate')}
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              {...register('endDate')}
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Budget Amount
            </label>
            <input
              {...register('budgetAmount')}
              type="number"
              step="0.01"
              placeholder="0.00"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
            />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Services *</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['Fiber Optic Installation', 'Network Cabling', 'Tower Construction', 'Site Survey', 'Equipment Installation', 'Maintenance'].map((service) => (
            <label key={service} className="flex items-center">
              <input
                type="checkbox"
                value={service}
                {...register('services')}
                className="rounded border-gray-300 text-gold-600 focus:ring-gold-500"
              />
              <span className="ml-2 text-sm text-gray-700">{service}</span>
            </label>
          ))}
        </div>
        {errors.services && (
          <p className="mt-1 text-sm text-red-600">{errors.services.message}</p>
        )}
      </div>

      {/* Images */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Project Images</h2>
        <ImageUploader onImagesChange={setImages} />
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-gold-600 text-white rounded-md text-sm font-medium hover:bg-gold-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : projectId ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  );
}

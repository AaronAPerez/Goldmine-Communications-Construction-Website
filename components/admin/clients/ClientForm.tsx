'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientFormSchema, ClientFormData } from '@/lib/validations/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ClientFormProps {
  initialData?: Partial<ClientFormData>;
  clientId?: string;
  assignableUsers: Array<{ id: string; name: string; email: string }>;
}

export default function ClientForm({
  initialData,
  clientId,
  assignableUsers,
}: ClientFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: initialData || {
      type: 'RESIDENTIAL',
      source: 'WEBSITE',
      status: 'LEAD',
    },
  });

  const clientType = watch('type');

  const onSubmit = async (data: ClientFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const url = clientId
        ? `/api/admin/clients/${clientId}`
        : '/api/admin/clients';
      const method = clientId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save client');
      }

      router.push('/admin/clients');
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Client Type *
            </label>
            <select
              {...register('type')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
            >
              <option value="RESIDENTIAL">Residential</option>
              <option value="COMMERCIAL">Commercial</option>
              <option value="GOVERNMENT">Government</option>
              <option value="INDUSTRIAL">Industrial</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
            )}
          </div>

          {(clientType === 'COMMERCIAL' || clientType === 'GOVERNMENT' || clientType === 'INDUSTRIAL') && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                {...register('companyName')}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name *
            </label>
            <input
              {...register('firstName')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name *
            </label>
            <input
              {...register('lastName')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              {...register('email')}
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone *
            </label>
            <input
              {...register('phone')}
              type="tel"
              placeholder="(555) 123-4567"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Alternate Phone
            </label>
            <input
              {...register('alternatePhone')}
              type="tel"
              placeholder="(555) 123-4567"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Address</h2>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Street Address *
            </label>
            <input
              {...register('address.street')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
            />
            {errors.address?.street && (
              <p className="mt-1 text-sm text-red-600">{errors.address.street.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City *
              </label>
              <input
                {...register('address.city')}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
              />
              {errors.address?.city && (
                <p className="mt-1 text-sm text-red-600">{errors.address.city.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                State *
              </label>
              <input
                {...register('address.state')}
                type="text"
                maxLength={2}
                placeholder="CA"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
              />
              {errors.address?.state && (
                <p className="mt-1 text-sm text-red-600">{errors.address.state.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                ZIP Code *
              </label>
              <input
                {...register('address.zip')}
                type="text"
                placeholder="12345"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
              />
              {errors.address?.zip && (
                <p className="mt-1 text-sm text-red-600">{errors.address.zip.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lead Management */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Lead Management</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Lead Source
            </label>
            <select
              {...register('source')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
            >
              <option value="WEBSITE">Website</option>
              <option value="REFERRAL">Referral</option>
              <option value="SOCIAL_MEDIA">Social Media</option>
              <option value="COLD_OUTREACH">Cold Outreach</option>
              <option value="REPEAT_CLIENT">Repeat Client</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              {...register('status')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
            >
              <option value="LEAD">Lead</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="PROPOSAL_SENT">Proposal Sent</option>
              <option value="ACTIVE_CLIENT">Active Client</option>
              <option value="COMPLETED">Completed</option>
              <option value="LOST">Lost</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assigned To *
            </label>
            <select
              {...register('assignedToId')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold-500 focus:ring-gold-500"
            >
              <option value="">Select user</option>
              {assignableUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
            {errors.assignedToId && (
              <p className="mt-1 text-sm text-red-600">{errors.assignedToId.message}</p>
            )}
          </div>
        </div>
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
          {isSubmitting ? 'Saving...' : clientId ? 'Update Client' : 'Create Client'}
        </button>
      </div>
    </form>
  );
}

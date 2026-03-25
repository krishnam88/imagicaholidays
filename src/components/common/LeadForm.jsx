import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Send } from 'lucide-react';

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\+?\d{10,15}$/, 'Enter a valid phone number (10–15 digits, optionally starting with +)'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  destination: z.string().optional(),
  message: z.string().optional(),
  travelDate: z.string().optional(),
  travelers: z.coerce.number().min(1).optional(),
});

export default function LeadForm({
  onSubmit,
  isSubmitting = false,
  showDestination = false,
  showDate = false,
  showTravelers = false,
  showMessage = false,
  submitLabel = 'Get Free Quote',
  className = '',
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(leadSchema) });

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={`space-y-4 ${className}`} noValidate>
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
        <input
          {...register('name')}
          type="text"
          placeholder="Your full name"
          className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
            errors.name ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-primary/40'
          }`}
          style={!errors.name ? { '--tw-ring-color': 'rgba(47,111,94,0.4)' } : {}}
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
        <input
          {...register('phone')}
          type="tel"
          placeholder="10-digit mobile number"
          className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
            errors.phone ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-primary/40'
          }`}
        />
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-gray-400 text-xs">(optional)</span></label>
        <input
          {...register('email')}
          type="email"
          placeholder="your@email.com"
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2"
        />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      {/* Destination */}
      {showDestination && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
          <input
            {...register('destination')}
            type="text"
            placeholder="Where do you want to go?"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2"
          />
        </div>
      )}

      {/* Travel Date */}
      {showDate && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
          <input
            {...register('travelDate')}
            type="date"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2"
          />
        </div>
      )}

      {/* Travelers */}
      {showTravelers && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
          <select
            {...register('travelers')}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
            ))}
            <option value={15}>10+ People (Group)</option>
          </select>
        </div>
      )}

      {/* Message */}
      {showMessage && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message <span className="text-gray-400 text-xs">(optional)</span></label>
          <textarea
            {...register('message')}
            rows={3}
            placeholder="Tell us about your travel plans..."
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 resize-none"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white text-sm font-semibold transition-opacity disabled:opacity-70"
        style={{ backgroundColor: '#2F6F5E' }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {submitLabel}
          </>
        )}
      </button>
    </form>
  );
}

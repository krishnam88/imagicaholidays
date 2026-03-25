/**
 * LeadForm – Reusable lead capture form component.
 *
 * Used on the Tour Detail page (booking box) and Contact page.
 * Validates with React Hook Form + Zod.
 * Calls the useLeadCapture hook on successful validation.
 *
 * Props:
 *   source    {string}  – CRM sub-source identifier (e.g. "tour-detail", "contact-page")
 *   tourName  {string}  – Pre-populated tour name (optional)
 *   compact   {boolean} – Compact layout for sidebar booking box
 */

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { useLeadCapture } from '../../hooks/useLeadCapture.js'
import ConfirmationModal from './ConfirmationModal.jsx'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .regex(/^\+?\d{10,15}$/, 'Enter a valid 10–15 digit phone number'),
  email: z
    .string()
    .email('Enter a valid email address')
    .optional()
    .or(z.literal('')),
  message: z.string().optional(),
})

export default function LeadForm({ source = 'general', tourName = '', compact = false }) {
  const { submit, isSubmitting, isSuccess, isDuplicate, reset } = useLeadCapture()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', phone: '', email: '', message: '' },
  })

  const onValid = async (data) => {
    await submit({
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      message: data.message || undefined,
      tourName: tourName || undefined,
      source,
    })
  }

  const inputClass =
    'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition'
  const labelClass = 'block text-xs font-medium text-gray-600 mb-1'
  const errorClass = 'text-xs text-red-500 mt-1'

  return (
    <>
      <form
        onSubmit={handleSubmit(onValid)}
        noValidate
        aria-label="Enquiry form"
        className={`space-y-${compact ? '3' : '4'}`}
      >
        {/* Name */}
        <div>
          <label htmlFor={`lf-name-${source}`} className={labelClass}>
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            id={`lf-name-${source}`}
            type="text"
            placeholder="John Doe"
            className={inputClass}
            {...register('name')}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor={`lf-phone-${source}`} className={labelClass}>
            Phone Number <span className="text-red-400">*</span>
          </label>
          <input
            id={`lf-phone-${source}`}
            type="tel"
            placeholder="+91 98765 43210"
            className={inputClass}
            {...register('phone')}
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>

        {/* Email (optional) */}
        <div>
          <label htmlFor={`lf-email-${source}`} className={labelClass}>
            Email Address <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id={`lf-email-${source}`}
            type="email"
            placeholder="you@example.com"
            className={inputClass}
            {...register('email')}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        {/* Message (hidden in compact mode) */}
        {!compact && (
          <div>
            <label htmlFor={`lf-msg-${source}`} className={labelClass}>
              Message <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              id={`lf-msg-${source}`}
              rows={3}
              placeholder="Tell us your travel plans or any questions…"
              className={`${inputClass} resize-none`}
              {...register('message')}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending…
            </>
          ) : (
            'Send Enquiry'
          )}
        </button>

        <p className="text-center text-xs text-gray-400">
          🔒 Your information is safe with us.
        </p>
      </form>

      {isSuccess && (
        <ConfirmationModal
          isDuplicate={isDuplicate}
          name={getValues('name')}
          onClose={reset}
        />
      )}
    </>
  )
}

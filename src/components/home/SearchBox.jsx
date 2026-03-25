/**
 * SearchBox – Hero search / quick enquiry form (Form 1).
 *
 * Validates with React Hook Form + Zod.
 * On valid submit, calls the useLeadCapture hook to send the lead to CRM.
 */

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Search, Loader2 } from 'lucide-react'
import { useLeadCapture } from '../../hooks/useLeadCapture.js'
import ConfirmationModal from '../common/ConfirmationModal.jsx'

const schema = z.object({
  destination: z.string().min(2, 'Please enter a destination'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .regex(/^\+?\d{10,15}$/, 'Enter a valid 10–15 digit phone number'),
})

export default function SearchBox() {
  const { submit, isSubmitting, isSuccess, isDuplicate, reset } = useLeadCapture()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ resolver: zodResolver(schema) })

  const onValid = async (data) => {
    await submit({
      name: data.name,
      phone: data.phone,
      message: `Interested in: ${data.destination}`,
      source: 'hero-search-box',
    })
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onValid)}
        noValidate
        className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl max-w-xl"
        aria-label="Quick holiday search"
      >
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Find your perfect holiday →
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Destination */}
          <div className="sm:col-span-3">
            <label htmlFor="sb-destination" className="sr-only">Destination</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="sb-destination"
                type="text"
                placeholder="Where do you want to go?"
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                {...register('destination')}
              />
            </div>
            {errors.destination && (
              <p className="text-xs text-red-500 mt-1 ml-1">{errors.destination.message}</p>
            )}
          </div>

          {/* Name */}
          <div className="sm:col-span-1">
            <label htmlFor="sb-name" className="sr-only">Your name</label>
            <input
              id="sb-name"
              type="text"
              placeholder="Your name"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1 ml-1">{errors.name.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="sm:col-span-1">
            <label htmlFor="sb-phone" className="sr-only">Phone number</label>
            <input
              id="sb-phone"
              type="tel"
              placeholder="Phone number"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              {...register('phone')}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1 ml-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="sm:col-span-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-2.5 px-4 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                'Get Quote'
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Success / Duplicate modal */}
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

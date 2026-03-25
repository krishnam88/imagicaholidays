/**
 * ConfirmationModal – Success popup displayed after a lead is submitted.
 *
 * Shows a green tick animation + a WhatsApp redirect button.
 * Distinguishes between a new lead and a duplicate (409) case.
 *
 * Props:
 *   isDuplicate {boolean}  – True when CRM returned 409
 *   name        {string}   – Customer's first name for personalisation
 *   onClose     {function} – Callback to reset the parent form/state
 */

import { useEffect } from 'react'
import { CheckCircle2, X, MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999'

export default function ConfirmationModal({ isDuplicate = false, name = '', onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const firstName = name?.split(' ')[0] || 'there'
  const whatsappMessage = encodeURIComponent(
    `Hi! I just enquired on the Imagica Holidays website. My name is ${name}.`,
  )

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center animate-scale-in">
        {/* Close button */}
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Green tick */}
        <div className="flex items-center justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle2 size={48} className="text-primary" strokeWidth={1.5} />
          </div>
        </div>

        {/* Heading */}
        <h2 id="confirm-title" className="text-xl font-bold text-gray-900 mb-2">
          {isDuplicate
            ? `Welcome back, ${firstName}! 👋`
            : `Thank you, ${firstName}! 🎉`}
        </h2>

        {/* Body text */}
        <p className="text-sm text-gray-500 mb-6">
          {isDuplicate
            ? 'We already have your enquiry on file. Our travel expert will reach out to you shortly.'
            : 'Your enquiry has been received. Our travel expert will call you within 24 hours.'}
        </p>

        {/* WhatsApp CTA */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-semibold py-3 rounded-xl hover:bg-[#1ebe5c] transition-colors mb-3"
        >
          <MessageCircle size={18} />
          Chat on WhatsApp
        </a>

        {/* Dismiss */}
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}

/**
 * useLeadCapture – Custom React hook for CRM lead form submissions.
 *
 * Manages submission state, duplicate detection, and success confirmation
 * so every lead-capture form in the app shares the same UX behaviour.
 *
 * Usage:
 *   const { submit, isSubmitting, isSuccess, isDuplicate, reset } = useLeadCapture()
 *
 *   async function onValid(formData) {
 *     await submit({ ...formData, source: 'hero-form' })
 *   }
 */

import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { submitLead as crmSubmitLead } from '../services/crm.js'

/**
 * @typedef {object} LeadCaptureState
 * @property {(leadData: object) => Promise<void>} submit  – Call with validated form data
 * @property {boolean} isSubmitting   – True while the API request is in-flight
 * @property {boolean} isSuccess      – True after a successful (or duplicate) submission
 * @property {boolean} isDuplicate    – True if CRM returned 409 (phone already registered)
 * @property {() => void} reset       – Reset state back to idle (e.g. to allow another submission)
 */

/**
 * @returns {LeadCaptureState}
 */
export function useLeadCapture() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isDuplicate, setIsDuplicate] = useState(false)

  const submit = useCallback(async (leadData) => {
    setIsSubmitting(true)
    try {
      const result = await crmSubmitLead(leadData)

      if (result.duplicate) {
        setIsDuplicate(true)
        toast.success(
          'You have already enquired! Our team will reach out to you shortly.',
          { duration: 5000 },
        )
      } else {
        toast.success('Thank you! We will contact you soon.')
      }

      setIsSuccess(true)
    } catch (err) {
      console.error('[useLeadCapture] Submission error:', err)
      toast.error('Something went wrong. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const reset = useCallback(() => {
    setIsSuccess(false)
    setIsDuplicate(false)
    setIsSubmitting(false)
  }, [])

  return { submit, isSubmitting, isSuccess, isDuplicate, reset }
}

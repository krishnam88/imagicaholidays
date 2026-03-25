import { useState } from 'react';
import { submitLead } from '../services/crm';

/**
 * Custom hook for managing lead capture state and CRM submission.
 * @returns {{ submit: Function, isSubmitting: boolean, isSuccess: boolean, isDuplicate: boolean, reset: Function }}
 */
export function useLeadCapture() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (data) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await submitLead(data);
      if (result.success) {
        setIsSuccess(true);
        setIsDuplicate(false);
      } else if (result.duplicate) {
        setIsDuplicate(true);
        setIsSuccess(false);
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setIsSubmitting(false);
    setIsSuccess(false);
    setIsDuplicate(false);
    setError(null);
  };

  return { submit, isSubmitting, isSuccess, isDuplicate, error, reset };
}

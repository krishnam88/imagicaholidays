const BASE_URL = import.meta.env.VITE_CRM_BASE_URL || '';
const API_KEY = import.meta.env.VITE_CRM_API_KEY || '';

/**
 * Submit a lead to the CRM via webhook.
 * @param {Object} data - Lead data from form
 * @returns {Promise<{ success: boolean, duplicate: boolean, error: string|null }>}
 */
export async function submitLead(data) {
  const payload = {
    name: data.name?.trim(),
    phone: data.phone?.trim(),
    email: data.email?.trim() || undefined,
    message: data.message?.trim() || undefined,
    destination: data.destination?.trim() || undefined,
    travelDate: data.travelDate || undefined,
    travelers: data.travelers || undefined,
    leadSource: 'website',
    tourSlug: data.tourSlug || undefined,
    timestamp: new Date().toISOString(),
  };

  const response = await fetch(`${BASE_URL}/queries/webhook/website`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(API_KEY && { 'x-api-key': API_KEY }),
    },
    body: JSON.stringify(payload),
  });

  if (response.status === 409) {
    return { success: false, duplicate: true, error: null };
  }

  if (!response.ok) {
    const text = await response.text().catch(() => 'Unknown error');
    return { success: false, duplicate: false, error: text };
  }

  return { success: true, duplicate: false, error: null };
}

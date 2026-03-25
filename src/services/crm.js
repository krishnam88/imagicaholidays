/**
 * CRM Integration Service
 *
 * Sends lead data to the CRM webhook running on Railway.
 * Endpoint: POST /queries/webhook/website
 *
 * Environment variables required:
 *   VITE_CRM_BASE_URL  – Base URL of the CRM API (e.g. https://crm.example.up.railway.app/api)
 *   VITE_CRM_API_KEY   – Shared secret / API key for the webhook
 */

const CRM_BASE_URL = import.meta.env.VITE_CRM_BASE_URL || ''
const CRM_API_KEY = import.meta.env.VITE_CRM_API_KEY || ''

/**
 * Submit a new lead to the CRM.
 *
 * @param {object} leadData
 * @param {string} leadData.name        – Full name of the prospective customer
 * @param {string} leadData.phone       – Phone number (e.g. "+919876543210")
 * @param {string} [leadData.email]     – Optional email address
 * @param {string} [leadData.message]   – Optional enquiry message
 * @param {string} [leadData.tourName]  – Tour/package of interest
 * @param {string} [leadData.source]    – Sub-source identifier (e.g. "hero-form", "tour-detail")
 *
 * @returns {Promise<{ success: boolean; duplicate: boolean; data?: unknown }>}
 */
export async function submitLead(leadData) {
  if (!CRM_BASE_URL) {
    console.warn('[CRM] VITE_CRM_BASE_URL is not set – lead submission skipped.')
    return { success: false, duplicate: false }
  }

  const payload = {
    name: leadData.name?.trim(),
    phone: leadData.phone?.trim(),
    email: leadData.email?.trim() || undefined,
    message: leadData.message?.trim() || undefined,
    tourName: leadData.tourName?.trim() || undefined,
    leadSource: 'website',
    source: leadData.source || 'general',
    submittedAt: new Date().toISOString(),
  }

  const response = await fetch(`${CRM_BASE_URL}/queries/webhook/website`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(CRM_API_KEY ? { 'x-api-key': CRM_API_KEY } : {}),
    },
    body: JSON.stringify(payload),
  })

  // 409 Conflict → duplicate lead (phone already registered)
  if (response.status === 409) {
    return { success: true, duplicate: true }
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error')
    throw new Error(`CRM submission failed (${response.status}): ${errorText}`)
  }

  const data = await response.json().catch(() => null)
  return { success: true, duplicate: false, data }
}

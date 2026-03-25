/**
 * API Service – Fetches tour and hotel data from the backend.
 *
 * Environment variable:
 *   VITE_CRM_BASE_URL  – Base URL of the backend API
 *
 * All functions return plain JSON objects or arrays.
 * Falls back gracefully (returns empty arrays) if the API is not available.
 */

const BASE_URL = import.meta.env.VITE_CRM_BASE_URL || ''

/**
 * Generic GET helper with error handling.
 * @param {string} path  – API path relative to BASE_URL (e.g. "/tours")
 * @param {object} [params] – Query parameters
 */
async function apiGet(path, params = {}) {
  if (!BASE_URL) {
    console.warn(`[API] VITE_CRM_BASE_URL is not set – request to ${path} skipped.`)
    return null
  }

  const url = new URL(`${BASE_URL}${path}`)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value))
    }
  })

  const response = await fetch(url.toString(), {
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// ─── Tours ────────────────────────────────────────────────────────────────────

/**
 * Fetch a list of tours.
 * @param {{ featured?: boolean; limit?: number; destination?: string }} [filters]
 * @returns {Promise<Array>}
 */
export async function fetchTours(filters = {}) {
  const data = await apiGet('/tours', filters)
  return data ?? []
}

/**
 * Fetch a single tour by its slug/id.
 * @param {string} id
 * @returns {Promise<object|null>}
 */
export async function fetchTourById(id) {
  return apiGet(`/tours/${id}`)
}

// ─── Hotels ───────────────────────────────────────────────────────────────────

/**
 * Fetch a list of hotels.
 * @param {{ destination?: string; limit?: number }} [filters]
 * @returns {Promise<Array>}
 */
export async function fetchHotels(filters = {}) {
  const data = await apiGet('/hotels', filters)
  return data ?? []
}

/**
 * Fetch a single hotel by its slug/id.
 * @param {string} id
 * @returns {Promise<object|null>}
 */
export async function fetchHotelById(id) {
  return apiGet(`/hotels/${id}`)
}

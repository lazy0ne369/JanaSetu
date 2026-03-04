// API service for JanaSetu AI
// All backend calls are centralised here.
// Replace BASE_URL when deploying to AWS.

const BASE_URL = 'http://127.0.0.1:8000';

/**
 * Send a user profile to the backend and get matching schemes.
 * @param {Object} profile - User profile data
 * @returns {Promise<{matched_schemes: Array}>}
 */
export async function matchSchemes(profile) {
    const response = await fetch(`${BASE_URL}/api/schemes/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.detail || `Server error: ${response.status}`);
    }

    return response.json();
}

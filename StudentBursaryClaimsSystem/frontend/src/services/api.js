/**
 * Student: Gomolemo Tshenye
 * Student Number: ST10341577
 * Assessment: ICE Task 1 - Student Bursary Claims Management System
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  // The browser Fetch API is used for asynchronous HTTP communication with the Express API (MDN Web Docs, 2026).
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });

  let data;
  try {
    data = await response.json();
  } catch {
    data = { message: 'The server returned an unreadable response.' };
  }

  if (!response.ok) {
    const error = new Error(data.message || 'Request failed.');
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

export const claimsApi = {
  create: (payload) => request('/claims', { method: 'POST', body: JSON.stringify(payload) }),
  byStudent: (studentNumber) => request(`/claims/student/${encodeURIComponent(studentNumber)}`),
  byId: (claimId) => request(`/claims/${encodeURIComponent(claimId)}`),
  cancel: (claimId) => request(`/claims/${encodeURIComponent(claimId)}/cancel`, { method: 'PATCH' })
};

/**
 * COMMENT REFERENCE LIST
 * 1. MDN Web Docs (2026) 'Fetch API'. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API (Accessed: 25 September 2026).
 * 2. MDN Web Docs (2026) 'Response: ok property'. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Response/ok (Accessed: 25 September 2026).
 */

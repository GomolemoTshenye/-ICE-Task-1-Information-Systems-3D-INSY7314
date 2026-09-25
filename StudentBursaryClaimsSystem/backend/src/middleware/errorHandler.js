/**
 * Student: Gomolemo Tshenye
 * Student Number: ST10341577
 * Assessment: ICE Task 1 - Student Bursary Claims Management System
 */

export function notFoundHandler(req, res) {
  res.status(404).json({ status: 404, message: 'API route not found.' });
}

// Centralised Express error middleware keeps API error responses consistent (Express.js, 2026).
export function errorHandler(error, req, res, next) {
  console.error(error);

  if (error?.name === 'ValidationError') {
    return res.status(400).json({
      status: 400,
      message: 'Validation failed.',
      errors: Object.values(error.errors).map((item) => ({ field: item.path, message: item.message }))
    });
  }

  return res.status(500).json({ status: 500, message: 'An unexpected server error occurred.' });
}

/**
 * COMMENT REFERENCE LIST
 * 1. Express.js (2026) 'Error handling'. Available at: https://expressjs.com/en/guide/error-handling.html (Accessed: 25 September 2026).
 * 2. MDN Web Docs (2026) 'HTTP response status codes'. Available at: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status (Accessed: 25 September 2026).
 */

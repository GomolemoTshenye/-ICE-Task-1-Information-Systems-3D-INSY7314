/**
 * Student: Gomolemo Tshenye
 * Student Number: ST10341577
 * Assessment: ICE Task 1 - Student Bursary Claims Management System
 */

export default function StatusBadge({ status }) {
  const key = String(status || '').toLowerCase();
  return <span className={`status status-${key}`}>{status}</span>;
}

/**
 * COMMENT REFERENCE LIST
 * 1. React (2026) 'Describing the UI'. Available at: https://react.dev/learn/describing-the-ui (Accessed: 25 September 2026).
 */

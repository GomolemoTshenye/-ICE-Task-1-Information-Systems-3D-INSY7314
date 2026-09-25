/**
 * Student: Gomolemo Tshenye
 * Student Number: ST10341577
 * Assessment: ICE Task 1 - Student Bursary Claims Management System
 */

import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <section className="page hero-page">
      <div className="hero-copy">
        <span className="eyebrow">University Bursary Programme</span>
        <h1>Submit and track monthly bursary claims in one place.</h1>
        <p>
          Record your hours worked, see your automatically calculated claim amount,
          review recent submissions, and cancel a claim while it is still pending.
        </p>
        <div className="actions">
          {/* Link changes routes without performing a full page reload (React Router, 2026). */}
          <Link className="button primary" to="/submit">Submit a new claim</Link>
          <Link className="button secondary" to="/claims">View my claims</Link>
        </div>
      </div>
      <div className="summary-card">
        <div><span>Hourly rate</span><strong>R200.00</strong></div>
        <div><span>New claim status</span><strong>Pending</strong></div>
        <div><span>Claim history</span><strong>Previous 12 months</strong></div>
      </div>
    </section>
  );
}

/**
 * COMMENT REFERENCE LIST
 * 1. React (2026) 'Describing the UI'. Available at: https://react.dev/learn/describing-the-ui (Accessed: 25 September 2026).
 * 2. React Router (2026) 'Link'. Available at: https://reactrouter.com/ (Accessed: 25 September 2026).
 */

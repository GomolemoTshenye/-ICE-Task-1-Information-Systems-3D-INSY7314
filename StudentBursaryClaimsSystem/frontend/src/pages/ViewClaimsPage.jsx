/**
 * Student: Gomolemo Tshenye
 * Student Number: ST10341577
 * Assessment: ICE Task 1 - Student Bursary Claims Management System
 */

import { useState } from 'react';
import StatusBadge from '../components/StatusBadge.jsx';
import { claimsApi } from '../services/api.js';

const money = (value) => Number(value || 0).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' });
const date = (value) => new Date(value).toLocaleString('en-ZA', { dateStyle: 'medium', timeStyle: 'short' });

export default function ViewClaimsPage() {
  const [studentNumber, setStudentNumber] = useState('');
  // React state stores search results and refreshes the table after claim actions (React, 2026).
  const [claims, setClaims] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cancelling, setCancelling] = useState(null);

  async function search(event) {
    event.preventDefault();
    if (!studentNumber.trim()) {
      setMessage({ type: 'error', text: 'Enter a Student Number to search.' });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const result = await claimsApi.byStudent(studentNumber.trim());
      setClaims(result);
      if (!result.length) setMessage({ type: 'info', text: 'No claims were found for this student in the previous 12 months.' });
    } catch (error) {
      setClaims([]);
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  }

  async function cancel(claimId) {
    if (!window.confirm('Cancel this pending claim?')) return;
    setCancelling(claimId);
    setMessage(null);
    try {
      // The UI requests cancellation, while the backend independently enforces the Pending-only rule (IIE, 2026).
      await claimsApi.cancel(claimId);
      setClaims((items) => items.map((claim) => claim._id === claimId ? { ...claim, status: 'Cancelled' } : claim));
      setMessage({ type: 'success', text: 'Claim cancelled successfully.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setCancelling(null);
    }
  }

  return (
    <section className="page claims-page">
      <div className="page-heading">
        <span className="eyebrow">Parts B & C</span>
        <h1>View recent claims</h1>
        <p>Search by Student Number. The API returns only claims submitted during the previous 12 months.</p>
      </div>

      <form className="search-bar card" onSubmit={search}>
        <label>
          <span>Student Number</span>
          <input value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} maxLength="20" placeholder="ST2026001" />
        </label>
        <button className="button primary" type="submit" disabled={loading}>{loading ? 'Searching…' : 'Search Claims'}</button>
      </form>

      {message && <div className={`message ${message.type}`}>{message.text}</div>}

      {claims.length > 0 && (
        <div className="table-card card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Claim ID</th><th>Student No.</th><th>Date Submitted</th><th>Hours</th><th>Rate</th><th>Total</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {claims.map((claim) => (
                  <tr key={claim._id}>
                    <td className="claim-id" title={claim._id}>{claim._id}</td>
                    <td>{claim.studentNumber}</td>
                    <td>{date(claim.dateSubmitted)}</td>
                    <td>{claim.hoursWorked}</td>
                    <td>{money(claim.hourlyRate)}</td>
                    <td><strong>{money(claim.totalClaimAmount)}</strong></td>
                    <td><StatusBadge status={claim.status} /></td>
                    <td>
                      <button className="button danger small" type="button" disabled={claim.status !== 'Pending' || cancelling === claim._id} onClick={() => cancel(claim._id)}>
                        {cancelling === claim._id ? 'Cancelling…' : 'Cancel'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * COMMENT REFERENCE LIST
 * 1. React (2026) 'useState'. Available at: https://react.dev/reference/react/useState (Accessed: 25 September 2026).
 * 2. MDN Web Docs (2026) 'Using Fetch'. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch (Accessed: 25 September 2026).
 * 3. IIE (2026) 'ICE Task 1: Student Bursary Claims Management System'. Unpublished assessment brief.
 */

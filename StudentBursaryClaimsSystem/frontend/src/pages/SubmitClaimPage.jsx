/**
 * Student: Gomolemo Tshenye
 * Student Number: ST10341577
 * Assessment: ICE Task 1 - Student Bursary Claims Management System
 */

import { useMemo, useState } from 'react';
import { claimsApi } from '../services/api.js';

const HOURLY_RATE = 200;
const MAX_HOURS = 160;
const emptyForm = { studentNumber: '', firstName: '', surname: '', hoursWorked: '' };

function validate(form) {
  const errors = {};
  if (!form.studentNumber.trim()) errors.studentNumber = 'Student Number is required.';
  else if (form.studentNumber.trim().length > 20) errors.studentNumber = 'Maximum 20 characters.';
  if (!form.firstName.trim()) errors.firstName = 'First Name is required.';
  else if (form.firstName.trim().length > 50) errors.firstName = 'Maximum 50 characters.';
  if (!form.surname.trim()) errors.surname = 'Surname is required.';
  else if (form.surname.trim().length > 50) errors.surname = 'Maximum 50 characters.';
  const hours = Number(form.hoursWorked);
  if (!form.hoursWorked) errors.hoursWorked = 'Hours Worked is required.';
  else if (!Number.isFinite(hours) || hours <= 0) errors.hoursWorked = 'Hours Worked must be greater than zero.';
  else if (hours > MAX_HOURS) errors.hoursWorked = `Hours Worked must not exceed ${MAX_HOURS}.`;
  return errors;
}

export default function SubmitClaimPage() {
  // React state stores the form values while the student enters claim information (React, 2026).
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const total = useMemo(() => {
    const hours = Number(form.hoursWorked);
    return Number.isFinite(hours) && hours > 0 ? hours * HOURLY_RATE : 0;
  }, [form.hoursWorked]);

  function update(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setMessage(null);
  }

  async function submit(event) {
    event.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setMessage(null);
    try {
      const claim = await claimsApi.create({ ...form, hoursWorked: Number(form.hoursWorked) });
      setMessage({ type: 'success', text: `Claim submitted successfully. Claim ID: ${claim._id}` });
      setForm(emptyForm);
      setErrors({});
    } catch (error) {
      const apiErrors = error.data?.errors || [];
      if (apiErrors.length) {
        setErrors(Object.fromEntries(apiErrors.map((item) => [item.field, item.message])));
      }
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="page narrow-page">
      <div className="page-heading">
        <span className="eyebrow">Part A</span>
        <h1>Submit a bursary claim</h1>
        <p>Enter only your student details and hours worked. The server controls the rate, total, date and status.</p>
      </div>

      <form className="claim-form card" onSubmit={submit} noValidate>
        <div className="field-grid">
          <label>
            <span>Student Number</span>
            <input name="studentNumber" value={form.studentNumber} onChange={update} maxLength="20" placeholder="e.g. ST2026001" />
            {errors.studentNumber && <small className="field-error">{errors.studentNumber}</small>}
          </label>
          <label>
            <span>First Name</span>
            <input name="firstName" value={form.firstName} onChange={update} maxLength="50" placeholder="e.g. Thando" />
            {errors.firstName && <small className="field-error">{errors.firstName}</small>}
          </label>
          <label>
            <span>Surname</span>
            <input name="surname" value={form.surname} onChange={update} maxLength="50" placeholder="e.g. Mokoena" />
            {errors.surname && <small className="field-error">{errors.surname}</small>}
          </label>
          <label>
            <span>Hours Worked</span>
            <input name="hoursWorked" type="number" min="0.01" max={MAX_HOURS} step="0.25" value={form.hoursWorked} onChange={update} placeholder="e.g. 12.5" />
            {errors.hoursWorked && <small className="field-error">{errors.hoursWorked}</small>}
          </label>
        </div>

        <div className="calculation-panel">
          <div><span>Fixed hourly rate</span><strong>R {HOURLY_RATE.toFixed(2)}</strong></div>
          <div><span>Calculated total</span><strong>R {total.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></div>
        </div>

        {message && <div className={`message ${message.type}`}>{message.text}</div>}
        <button className="button primary full" type="submit" disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit Claim'}
        </button>
      </form>
    </section>
  );
}

/**
 * COMMENT REFERENCE LIST
 * 1. React (2026) 'useState'. Available at: https://react.dev/reference/react/useState (Accessed: 25 September 2026).
 * 2. MDN Web Docs (2026) 'Client-side form validation'. Available at: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation (Accessed: 25 September 2026).
 * 3. IIE (2026) 'ICE Task 1: Student Bursary Claims Management System'. Unpublished assessment brief.
 */

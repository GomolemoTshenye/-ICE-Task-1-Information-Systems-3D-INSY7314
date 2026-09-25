/**
 * Student: Gomolemo Tshenye
 * Student Number: ST10341577
 * Assessment: ICE Task 1 - Student Bursary Claims Management System
 */

import StudentClaim from '../models/StudentClaim.js';
import { DEFAULT_STATUS, HOURLY_RATE } from '../config/constants.js';

export async function createClaim({ studentNumber, firstName, surname, hoursWorked }) {
  const numericHours = Number(hoursWorked);
  return StudentClaim.create({
    studentNumber: studentNumber.trim(),
    firstName: firstName.trim(),
    surname: surname.trim(),
    hoursWorked: numericHours,
    hourlyRate: HOURLY_RATE,
    // The server calculates Hours Worked x R200.00 so the client cannot manipulate the total (IIE, 2026).
    totalClaimAmount: Number((numericHours * HOURLY_RATE).toFixed(2)),
    dateSubmitted: new Date(),
    status: DEFAULT_STATUS
  });
}

export async function getClaimById(claimId) {
  return StudentClaim.findById(claimId).lean();
}

export async function getRecentClaimsByStudent(studentNumber) {
  const cutoff = new Date();
  // Only the previous 12 months are included in student searches, as required by the brief (IIE, 2026).
  cutoff.setFullYear(cutoff.getFullYear() - 1);

  return StudentClaim.find({
    studentNumber: studentNumber.trim(),
    dateSubmitted: { $gte: cutoff }
  })
    .sort({ dateSubmitted: -1 })
    .lean();
}

export async function cancelClaim(claimId) {
  const claim = await StudentClaim.findById(claimId);
  if (!claim) return { type: 'notFound' };

  // Cancellation is a backend business rule: only Pending claims may be cancelled (IIE, 2026).
  if (claim.status !== 'Pending') {
    return {
      type: 'conflict',
      message: `${claim.status} claims cannot be cancelled.`
    };
  }

  claim.status = 'Cancelled';
  await claim.save();
  return { type: 'success', claim };
}

/**
 * COMMENT REFERENCE LIST
 * 1. Mongoose (2026) 'Models'. Available at: https://mongoosejs.com/docs/models.html (Accessed: 25 September 2026).
 * 2. Mongoose (2026) 'Queries'. Available at: https://mongoosejs.com/docs/queries.html (Accessed: 25 September 2026).
 * 3. IIE (2026) 'ICE Task 1: Student Bursary Claims Management System'. Unpublished assessment brief.
 */

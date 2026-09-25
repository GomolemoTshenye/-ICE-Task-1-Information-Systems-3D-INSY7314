/**
 * Student: Gomolemo Tshenye
 * Student Number: ST10341577
 * Assessment: ICE Task 1 - Student Bursary Claims Management System
 */

import * as claimService from '../services/claimService.js';

export async function submitClaim(req, res, next) {
  try {
    const claim = await claimService.createClaim(req.body);
    // HTTP 201 indicates that the claim resource was successfully created (MDN Web Docs, 2026).
    return res.status(201).json(claim);
  } catch (error) {
    next(error);
  }
}

export async function getClaim(req, res, next) {
  try {
    const claim = await claimService.getClaimById(req.params.claimId);
    if (!claim) return res.status(404).json({ status: 404, message: 'Claim does not exist.' });
    return res.status(200).json(claim);
  } catch (error) {
    next(error);
  }
}

export async function getStudentClaims(req, res, next) {
  try {
    const claims = await claimService.getRecentClaimsByStudent(req.params.studentNumber);
    return res.status(200).json(claims);
  } catch (error) {
    next(error);
  }
}

export async function cancelClaim(req, res, next) {
  try {
    const result = await claimService.cancelClaim(req.params.claimId);
    if (result.type === 'notFound') {
      return res.status(404).json({ status: 404, message: 'Claim does not exist.' });
    }
    if (result.type === 'conflict') {
      // HTTP 409 represents a business-rule conflict, such as cancelling a non-pending claim (MDN Web Docs, 2026).
      return res.status(409).json({ status: 409, message: result.message });
    }
    return res.status(200).json({
      _id: result.claim._id,
      status: result.claim.status,
      message: 'Claim cancelled successfully.'
    });
  } catch (error) {
    next(error);
  }
}

/**
 * COMMENT REFERENCE LIST
 * 1. Express.js (2026) 'Express routing'. Available at: https://expressjs.com/en/guide/routing.html (Accessed: 25 September 2026).
 * 2. MDN Web Docs (2026) 'HTTP response status codes'. Available at: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status (Accessed: 25 September 2026).
 */

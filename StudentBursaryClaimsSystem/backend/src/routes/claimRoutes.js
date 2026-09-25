/**
 * Student: Gomolemo Tshenye
 * Student Number: ST10341577
 * Assessment: ICE Task 1 - Student Bursary Claims Management System
 */

import { Router } from 'express';
import { cancelClaim, getClaim, getStudentClaims, submitClaim } from '../controllers/claimController.js';
import {
  createClaimValidation,
  handleValidationErrors,
  mongoIdValidation,
  studentNumberValidation
} from '../middleware/validation.js';

const router = Router();

// REST routes use HTTP methods that match the required claim operations (Express.js, 2026; MDN Web Docs, 2026).
router.post('/', createClaimValidation, handleValidationErrors, submitClaim);
router.get('/student/:studentNumber', studentNumberValidation, handleValidationErrors, getStudentClaims);
router.get('/:claimId', mongoIdValidation, handleValidationErrors, getClaim);
router.patch('/:claimId/cancel', mongoIdValidation, handleValidationErrors, cancelClaim);

export default router;

/**
 * COMMENT REFERENCE LIST
 * 1. Express.js (2026) 'Express routing'. Available at: https://expressjs.com/en/guide/routing.html (Accessed: 25 September 2026).
 * 2. MDN Web Docs (2026) 'HTTP request methods'. Available at: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods (Accessed: 25 September 2026).
 */

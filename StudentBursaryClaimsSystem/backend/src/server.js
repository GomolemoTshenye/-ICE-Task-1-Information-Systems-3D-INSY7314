/**
 * Student: Gomolemo Tshenye
 * Student Number: ST10341577
 * Assessment: ICE Task 1 - Student Bursary Claims Management System
 */

import 'dotenv/config';
import app from './app.js';
import { connectDatabase } from './config/db.js';

const port = Number(process.env.PORT || 5000);

try {
  await connectDatabase();
  app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
} catch (error) {
  console.error('Failed to start API:', error.message);
  process.exit(1);
}

/**
 * COMMENT REFERENCE LIST
 * 1. Node.js (2026) 'Node.js documentation'. Available at: https://nodejs.org/docs/latest/api/ (Accessed: 25 September 2026).
 * 2. Dotenv (2026) 'dotenv'. Available at: https://www.npmjs.com/package/dotenv (Accessed: 25 September 2026).
 */

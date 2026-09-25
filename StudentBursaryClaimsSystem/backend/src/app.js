/**
 * Student: Gomolemo Tshenye
 * Student Number: ST10341577
 * Assessment: ICE Task 1 - Student Bursary Claims Management System
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import claimRoutes from './routes/claimRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Express creates the REST API application and middleware pipeline (Express.js, 2026).
const app = express();

app.disable('x-powered-by');
// Helmet adds security-related HTTP response headers (Helmet, 2026).
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '20kb' }));
// Rate limiting reduces excessive repeated API requests (Express Rate Limit, 2026).
app.use(rateLimit({ windowMs: 60_000, limit: 120, standardHeaders: 'draft-7', legacyHeaders: false }));

app.get('/api/health', (req, res) => res.status(200).json({ status: 'ok', message: 'Student Bursary Claims API is running.' }));
app.use('/api/claims', claimRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

/**
 * COMMENT REFERENCE LIST
 * 1. Express.js (2026) 'Express - Node.js web application framework'. Available at: https://expressjs.com/ (Accessed: 25 September 2026).
 * 2. Helmet (2026) 'Helmet: Help secure Express apps with HTTP headers'. Available at: https://helmetjs.github.io/ (Accessed: 25 September 2026).
 * 3. Express Rate Limit (2026) 'express-rate-limit documentation'. Available at: https://express-rate-limit.mintlify.app/ (Accessed: 25 September 2026).
 */

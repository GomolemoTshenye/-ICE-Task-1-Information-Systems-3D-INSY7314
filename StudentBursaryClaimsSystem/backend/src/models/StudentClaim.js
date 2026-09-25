/**
 * Student: Gomolemo Tshenye
 * Student Number: ST10341577
 * Assessment: ICE Task 1 - Student Bursary Claims Management System
 */

import mongoose from 'mongoose';
import { ALLOWED_STATUSES, DEFAULT_STATUS, HOURLY_RATE, MAX_MONTHLY_HOURS } from '../config/constants.js';

// Mongoose schemas define field types, defaults and validation rules for MongoDB documents (Mongoose, 2026).
const studentClaimSchema = new mongoose.Schema(
  {
    studentNumber: {
      type: String,
      required: [true, 'Student Number is required.'],
      maxlength: [20, 'Student Number must not exceed 20 characters.'],
      trim: true,
      index: true
    },
    firstName: {
      type: String,
      required: [true, 'First Name is required.'],
      maxlength: [50, 'First Name must not exceed 50 characters.'],
      trim: true
    },
    surname: {
      type: String,
      required: [true, 'Surname is required.'],
      maxlength: [50, 'Surname must not exceed 50 characters.'],
      trim: true
    },
    hoursWorked: {
      type: Number,
      required: [true, 'Hours Worked is required.'],
      min: [0.01, 'Hours Worked must be greater than zero.'],
      max: [MAX_MONTHLY_HOURS, `Hours Worked must not exceed ${MAX_MONTHLY_HOURS}.`]
    },
    hourlyRate: {
      type: Number,
      required: true,
      default: HOURLY_RATE,
      immutable: true
    },
    totalClaimAmount: {
      type: Number,
      required: true
    },
    dateSubmitted: {
      type: Date,
      required: true,
      default: Date.now
    },
    status: {
      type: String,
      enum: ALLOWED_STATUSES,
      required: true,
      default: DEFAULT_STATUS
    }
  },
  { collection: 'studentclaims', versionKey: false }
);

export default mongoose.model('StudentClaim', studentClaimSchema);

/**
 * COMMENT REFERENCE LIST
 * 1. Mongoose (2026) 'Schemas'. Available at: https://mongoosejs.com/docs/guide.html (Accessed: 25 September 2026).
 * 2. Mongoose (2026) 'Validation'. Available at: https://mongoosejs.com/docs/validation.html (Accessed: 25 September 2026).
 */

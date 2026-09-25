/**
 * Student: Gomolemo Tshenye
 * Student Number: ST10341577
 * Assessment: ICE Task 1 - Student Bursary Claims Management System
 */

import mongoose from 'mongoose';

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/student_bursary_claims';
  // Mongoose manages the application's connection to MongoDB (Mongoose, 2026).
  await mongoose.connect(uri);
  console.log(`MongoDB connected: ${mongoose.connection.name}`);
}

/**
 * COMMENT REFERENCE LIST
 * 1. Mongoose (2026) 'Connections'. Available at: https://mongoosejs.com/docs/connections.html (Accessed: 25 September 2026).
 */

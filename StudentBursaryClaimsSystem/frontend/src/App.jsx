/**
 * Student: Gomolemo Tshenye
 * Student Number: ST10341577
 * Assessment: ICE Task 1 - Student Bursary Claims Management System
 */

import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import SubmitClaimPage from './pages/SubmitClaimPage.jsx';
import ViewClaimsPage from './pages/ViewClaimsPage.jsx';

export default function App() {
  return (
    <Layout>
            {/* React Router maps browser routes to the required application pages (React Router, 2026). */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/submit" element={<SubmitClaimPage />} />
        <Route path="/claims" element={<ViewClaimsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

/**
 * COMMENT REFERENCE LIST
 * 1. React Router (2026) 'Routing'. Available at: https://reactrouter.com/ (Accessed: 25 September 2026).
 */

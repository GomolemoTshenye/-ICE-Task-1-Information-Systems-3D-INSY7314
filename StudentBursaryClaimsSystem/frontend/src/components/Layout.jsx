/**
 * Student: Gomolemo Tshenye
 * Student Number: ST10341577
 * Assessment: ICE Task 1 - Student Bursary Claims Management System
 */

import { NavLink } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">BC</div>
          <div>
            <strong>Bursary Claims</strong>
            <span>Student Portal</span>
          </div>
        </div>
        <nav aria-label="Main navigation">
          {/* NavLink provides client-side navigation with active-route styling (React Router, 2026). */}
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/submit">Submit Claim</NavLink>
          <NavLink to="/claims">View Claims</NavLink>
        </nav>
      </header>
      <main>{children}</main>
      <footer>Student Bursary Claims Management System · MERN Stack</footer>
    </div>
  );
}

/**
 * COMMENT REFERENCE LIST
 * 1. React Router (2026) 'NavLink'. Available at: https://reactrouter.com/ (Accessed: 25 September 2026).
 */

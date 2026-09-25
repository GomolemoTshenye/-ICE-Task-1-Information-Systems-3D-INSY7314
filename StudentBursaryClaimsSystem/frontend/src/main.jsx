/**
 * Student: Gomolemo Tshenye
 * Student Number: ST10341577
 * Assessment: ICE Task 1 - Student Bursary Claims Management System
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles.css';

ReactDOM.// React mounts the component tree into the application's root DOM element (React, 2026).
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

/**
 * COMMENT REFERENCE LIST
 * 1. React (2026) 'createRoot'. Available at: https://react.dev/reference/react-dom/client/createRoot (Accessed: 25 September 2026).
 * 2. React Router (2026) 'BrowserRouter'. Available at: https://reactrouter.com/ (Accessed: 25 September 2026).
 */

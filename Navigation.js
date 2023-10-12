// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/teacher">Teacher Dashboard</Link>
        </li>
        <li>
          <Link to="/student">Student Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;

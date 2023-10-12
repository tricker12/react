// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
        <h1>Course Dashboard</h1>
      <div className="header-buttons">
        <Link to="/teacher">Teacher Dashboard</Link>
        <Link to="/student">Student Dashboard</Link>
      </div>
      
    </header>
  );
};

export default Header;

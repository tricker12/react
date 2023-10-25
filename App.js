import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';
import Header from './Header';
import './App.css';

function App() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/teacher" element={<TeacherDashboard courses={courses} setCourses={setCourses} />} />
          <Route path="/student" element={<StudentDashboard students={students} setStudents={setStudents} courses={courses} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


import Link from 'next/link';

function Header(){
    return (
        <header className="header">
            <h1>Course Dashboard</h1>
          <div className="header-buttons">
          <Link href="/teacher">Teacher Dashboard</Link>
          <Link href="/student">Student Dashboard</Link>
          </div>
          
        </header>
      );
}
export default Header;

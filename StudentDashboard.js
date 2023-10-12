import React, { useState } from 'react';
import './styles.css';

const StudentDashboard = ({ students, setStudents, courses }) => {
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [filter, setFilter] = useState('');

  const addStudent = () => {
    if (studentName.trim() === '' || studentId.trim() === '' || studentClass.trim() === '' || selectedCourse.trim() === '') return;
    if (editingStudent) {
      // Edit student
      const updatedStudents = students.map(student =>
        student.id === editingStudent.id
          ? {
              ...student,
              name: studentName,
              studentId: studentId,
              studentClass: studentClass,
              course: selectedCourse,
            }
          : student
      );
      setStudents(updatedStudents);
      setEditingStudent(null);
    } else {
      // Add a new student
      const newStudent = {
        id: Date.now(),
        name: studentName,
        studentId: studentId,
        studentClass: studentClass,
        course: selectedCourse,
      };
      setStudents([...students, newStudent]);
    }
    setStudentName('');
    setStudentId('');
    setStudentClass('');
    setSelectedCourse('');
  };

  const editStudent = (student) => {
    setStudentName(student.name);
    setStudentId(student.studentId);
    setStudentClass(student.studentClass);
    setSelectedCourse(student.course);
    setEditingStudent(student);
  };

  const deleteStudent = (student) => {
    const updatedStudents = students.filter(s => s.id !== student.id);
    setStudents(updatedStudents);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div className="filter-input">
        <input
          type="text"
          placeholder="Filter by Student Name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div>
        <h2>{editingStudent ? 'Edit Student' : 'Add Student'}</h2>
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Student Class"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
        />
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="" disabled>
            Select a Course
          </option>
          {courses.map((course) => (
            <option key={course.id} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
        <button onClick={addStudent}>{editingStudent ? 'Update' : 'Add'}</button>
        {editingStudent && (
          <button onClick={() => setEditingStudent(null)}>Cancel</button>
        )}
      </div>
      <div className="students-grid">
        {filteredStudents.map((student) => (
          <div className="student-card" key={student.id}>
            <strong>Name: {student.name}</strong>
            <p>Student ID: {student.studentId}</p>
            <p>Class: {student.studentClass}</p>
            <p>Course: {student.course}</p>
            <div className="student-actions">
              <button onClick={() => editStudent(student)}>Edit</button>
              <button onClick={() => deleteStudent(student)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;

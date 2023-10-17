

import React, { useState } from 'react';
import './styles.css';

const StudentDashboard = ({ students, setStudents, courses }) => {
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [filter, setFilter] = useState('');
  const [addingStudent, setAddingStudent] = useState(false); // State for showing/hiding the add student form

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
    setAddingStudent(false); // Close the add student form
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
        <button onClick={() => setAddingStudent(true)}>Add Student</button>
      </div>

      {/* Add Student Form Overlay */}
      {addingStudent && (
        <div className="add-student-overlay">
          <div className="add-student-form">
            <h2>Add Student</h2>
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
              <option value="" disabled>Select a Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
            <div className="form-buttons">
              <button onClick={addStudent}>Add</button>
              <button onClick={() => setAddingStudent(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="students-table">
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student ID</th>
              <th>Student Class</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>
                  {editingStudent && editingStudent.id === student.id ? (
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td>
                  {editingStudent && editingStudent.id === student.id ? (
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                    />
                  ) : (
                    student.studentId
                  )}
                </td>
                <td>
                  {editingStudent && editingStudent.id === student.id ? (
                    <input
                      type="text"
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                    />
                  ) : (
                    student.studentClass
                  )}
                </td>
                <td>
                  {editingStudent && editingStudent.id === student.id ? (
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                      {courses.map((course) => (
                        <option key={course.id} value={course.name}>
                          {course.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    student.course
                  )}
                </td>
                <td>
                  {editingStudent && editingStudent.id === student.id ? (
                    <div className="form-buttons">
                      <button onClick={addStudent}>Update</button>
                      <button onClick={() => setEditingStudent(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div className="form-buttons">
                      <button onClick={() => editStudent(student)}>Edit</button>
                      <button onClick={() => deleteStudent(student)}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;


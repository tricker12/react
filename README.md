# react
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







import React, { useState } from 'react';


const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]); // Initialize students as an empty array

// Rest of your component code

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





import React, { useState } from 'react';

export default function TeacherDashboard() {
  const [courses, setCourses] = useState([]); // Initialize courses as an empty array

// Rest of your component code

  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseFaculty, setCourseFaculty] = useState('');
  const [editingCourse, setEditingCourse] = useState(null);
  const [filter, setFilter] = useState('');
  const [showAddForm, setShowAddForm] = useState(false); // State to control the form display

  const addCourse = () => {
    if (
      courseName.trim() === '' ||
      courseDescription.trim() === '' ||
      courseFaculty.trim() === ''
    )
      return;

    if (editingCourse) {
      // Edit course
      const updatedCourses = courses.map((course) =>
        course.id === editingCourse.id
          ? {
              ...course,
              name: courseName,
              description: courseDescription,
              faculty: courseFaculty,
            }
          : course
      );
      setCourses(updatedCourses);
      setEditingCourse(null);
    } else {
      // Add a new course
      const newCourse = {
        id: Date.now(),
        name: courseName,
        description: courseDescription,
        faculty: courseFaculty,
      };
      setCourses([...courses, newCourse]);
    }
    setCourseName('');
    setCourseDescription('');
    setCourseFaculty('');
    setShowAddForm(false); // Close the form after adding/editing the course
  };

  const editCourse = (course) => {
    setCourseName(course.name);
    setCourseDescription(course.description);
    setCourseFaculty(course.faculty);
    setEditingCourse(course);
  };

  const cancelEdit = () => {
    setEditingCourse(null);
    setCourseName('');
    setCourseDescription('');
    setCourseFaculty('');
  };

  const deleteCourse = (course) => {
    const updatedCourses = courses.filter((c) => c.id !== course.id);
    setCourses(updatedCourses);
  };

  const filteredCourses = courses
  ? courses.filter((course) =>
      course.name.toLowerCase().includes(filter.toLowerCase())
    )
  : [];

  return (
    <div>
      <div className="filter-input">
        <input
          type="text"
          placeholder="Filter by Course "
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="courses-table">
        <button className="addc" onClick={() => setShowAddForm(true)}>
          Add Course
        </button>

        {showAddForm && (
          <div className="overlay">
            <div className="overlay-content">
              <h2>Add Course</h2>
              <input
                type="text"
                placeholder="Course Name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Course Description"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
              />
              <input
                type="text"
                placeholder="Faculty"
                value={courseFaculty}
                onChange={(e) => setCourseFaculty(e.target.value)}
              />
              <button onClick={addCourse}>
                {editingCourse ? 'Update' : 'Add'}
              </button>
              {editingCourse && <button onClick={cancelEdit}>Cancel</button>}
            </div>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Course Description</th>
              <th>Faculty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course.id}>
                <td>
                  {editingCourse && editingCourse.id === course.id ? (
                    <input
                      type="text"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                    />
                  ) : (
                    course.name
                  )}
                </td>
                <td>
                  {editingCourse && editingCourse.id === course.id ? (
                    <input
                      type="text"
                      value={courseDescription}
                      onChange={(e) => setCourseDescription(e.target.value)}
                    />
                  ) : (
                    course.description
                  )}
                </td>
                <td>
                  {editingCourse && editingCourse.id === course.id ? (
                    <input
                      type="text"
                      value={courseFaculty}
                      onChange={(e) => setCourseFaculty(e.target.value)}
                    />
                  ) : (
                    course.faculty
                  )}
                </td>
                <td>
                  {editingCourse && editingCourse.id === course.id ? (
                    <>
                      <button onClick={addCourse}>Update</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => editCourse(course)}>Edit</button>
                      <button onClick={() => deleteCourse(course)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

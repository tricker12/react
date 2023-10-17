

import React, { useState } from 'react';
import './styles.css';

const TeacherDashboard = ({ courses, setCourses }) => {
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
      // Add new course
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

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(filter.toLowerCase())
  );

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
        <button className ="addc" onClick={() => setShowAddForm(true)}>Add Course</button>

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
              {editingCourse && (
                <button onClick={cancelEdit}>Cancel</button>
              )}
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
};

export default TeacherDashboard;

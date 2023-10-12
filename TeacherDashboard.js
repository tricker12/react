import React, { useState } from 'react';
import './styles.css';

const TeacherDashboard = ({ courses, setCourses }) => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseFaculty, setCourseFaculty] = useState('');
  const [editingCourse, setEditingCourse] = useState(null);
  const [filter, setFilter] = useState('');

  const addCourse = () => {
    if (courseName.trim() === '' || courseDescription.trim() === '' || courseFaculty.trim() === '') return;
    if (editingCourse) {
      // Edit course
      const updatedCourses = courses.map(course =>
        course.id === editingCourse.id
          ? { ...course, name: courseName, description: courseDescription, faculty: courseFaculty }
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
  };

  const editCourse = (course) => {
    setCourseName(course.name);
    setCourseDescription(course.description);
    setCourseFaculty(course.faculty);
    setEditingCourse(course);
  };

  const deleteCourse = (course) => {
    const updatedCourses = courses.filter(c => c.id !== course.id);
    setCourses(updatedCourses);
  };

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div className="filter-input">
        <input
          type="text"
          placeholder="Filter by Course Name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div>
        <h2>{editingCourse ? 'Edit Course' : 'Add Course'}</h2>
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Faculty"
          value={courseFaculty}
          onChange={(e) => setCourseFaculty(e.target.value)}
        />
        <button onClick={addCourse}>{editingCourse ? 'Update' : 'Add'}</button>
        {editingCourse && (
          <button onClick={() => setEditingCourse(null)}>Cancel</button>
        )}
      </div>
      <div className="courses-grid">
        {filteredCourses.map((course) => (
          <div className="course-box" key={course.id}>
            <strong>Course Name: {course.name}</strong>
            <p>Course Description: {course.description}</p>
            <p>Faculty: {course.faculty}</p>
            <div className="course-actions">
              <button onClick={() => editCourse(course)}>Edit</button>
              <button onClick={() => deleteCourse(course)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;

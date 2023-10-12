import React, { createContext, useContext, useState } from 'react';

const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  
  return (
    <StudentContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudentContext() {
  return useContext(StudentContext);
}

import { useState, useMemo } from "react";
import "./App.css";

import AddStudentForm from "./components/AddStudentForm";
import SearchFilterBar from "./components/SearchFilterBar";
import StudentList from "./components/StudentList";
import initialStudents from "./data/initialStudents";

function App() {
  // ---- State ----
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("");

  // ---- Handlers ----

  function handleAddStudent(newStudentData) {
    const newStudent = {
      id: Date.now(), // simple unique id for this demo
      ...newStudentData,
    };
    setStudents((prev) => [...prev, newStudent]);
  }

  function handleDeleteStudent(id) {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  }

  function handleReset() {
    setSearchTerm("");
    setCourseFilter("");
  }

  // ---- Derived data ----

  // Unique list of courses, used to populate the filter dropdown.
  const courseOptions = useMemo(
    () => [...new Set(students.map((s) => s.course))],
    [students]
  );

  // Apply search (by name) and course filter together.
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesName = student.name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
      const matchesCourse = courseFilter === "" || student.course === courseFilter;
      return matchesName && matchesCourse;
    });
  }, [students, searchTerm, courseFilter]);

  return (
    <div className="app">
      <header>
        <h1>🎓 Student Management App</h1>
        <p>Day 3 Task — HisabDo MERN Internship (React)</p>
      </header>

      <main>
        <section className="card">
          <h2>Add New Student</h2>
          <AddStudentForm onAddStudent={handleAddStudent} />
        </section>

        <section className="card">
          <SearchFilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            courseFilter={courseFilter}
            onCourseFilterChange={setCourseFilter}
            courseOptions={courseOptions}
            onReset={handleReset}
          />
          <p className="student-count">
            Total Students: <strong>{students.length}</strong>
            {(searchTerm || courseFilter) && (
              <span className="filtered-note">
                {" "}
                (showing {filteredStudents.length} matching)
              </span>
            )}
          </p>
        </section>

        <section className="card">
          <h2>Student List</h2>
          <StudentList students={filteredStudents} onDelete={handleDeleteStudent} />
        </section>
      </main>

      <footer>
        <p>Built with React — Components, Props, useState, Forms &amp; Conditional Rendering</p>
      </footer>
    </div>
  );
}

export default App;

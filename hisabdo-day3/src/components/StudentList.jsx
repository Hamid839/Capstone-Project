import StudentItem from "./StudentItem";

/**
 * StudentList
 * Renders the table of students using Array.map(). Demonstrates
 * conditional rendering: shows a "no results" message when the
 * filtered list is empty.
 */
function StudentList({ students, onDelete }) {
  if (students.length === 0) {
    return <p className="no-results">No students found.</p>;
  }

  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Course</th>
          <th>Marks</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentItem key={student.id} student={student} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}

export default StudentList;

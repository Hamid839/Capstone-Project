function StudentTable({ students, onEdit, onDelete, deletingId }) {
  if (students.length === 0) {
    return <p className="no-results">No students found.</p>;
  }

  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Course</th>
          <th>Marks</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student._id}>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.course}</td>
            <td>{student.marks}</td>
            <td className="actions-cell">
              <button className="edit-btn" onClick={() => onEdit(student)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => onDelete(student._id)}
                disabled={deletingId === student._id}
              >
                {deletingId === student._id ? "Deleting..." : "Delete"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;

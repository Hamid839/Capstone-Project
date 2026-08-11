/**
 * StudentItem
 * Renders a single student's row. Receives the `student` object and an
 * `onDelete` callback as props — a good example of props flowing down
 * and events flowing back up to the parent.
 */
function StudentItem({ student, onDelete }) {
  return (
    <tr>
      <td>{student.id}</td>
      <td>{student.name}</td>
      <td>{student.email}</td>
      <td>{student.course}</td>
      <td>{student.marks}</td>
      <td>
        <button className="delete-btn" onClick={() => onDelete(student.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default StudentItem;

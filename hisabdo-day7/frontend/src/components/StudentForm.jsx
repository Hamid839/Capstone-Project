import { useState, useEffect } from "react";

/**
 * StudentForm
 * Used for both "Add" and "Edit" — when `editingStudent` is passed in,
 * the form pre-fills and switches to update mode.
 */
function StudentForm({ editingStudent, onSubmit, onCancelEdit, submitting }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [marks, setMarks] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setEmail(editingStudent.email);
      setCourse(editingStudent.course);
      setMarks(editingStudent.marks);
    } else {
      setName("");
      setEmail("");
      setCourse("");
      setMarks("");
    }
  }, [editingStudent]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ name, email, course, marks: Number(marks) });

    if (!editingStudent) {
      setName("");
      setEmail("");
      setCourse("");
      setMarks("");
    }
  }

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Marks (0-100)"
          min="0"
          max="100"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting
            ? "Saving..."
            : editingStudent
            ? "💾 Update Student"
            : "➕ Add Student"}
        </button>
        {editingStudent && (
          <button type="button" className="cancel-btn" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default StudentForm;

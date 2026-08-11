import { useState } from "react";

/**
 * AddStudentForm
 * A controlled form component. Receives an `onAddStudent` function as a
 * prop and calls it with the new student's data on submit.
 */
function AddStudentForm({ onAddStudent }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [marks, setMarks] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // Stop the page from reloading

    if (!name.trim() || !email.trim() || !course.trim() || marks === "") {
      alert("Please fill in all fields.");
      return;
    }

    onAddStudent({
      name: name.trim(),
      email: email.trim(),
      course: course.trim(),
      marks: Number(marks),
    });

    // Reset form fields after successful submit
    setName("");
    setEmail("");
    setCourse("");
    setMarks("");
  }

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-row">
        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <input
          type="number"
          placeholder="Marks (0-100)"
          min="0"
          max="100"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
        />
      </div>
      <button type="submit">➕ Add Student</button>
    </form>
  );
}

export default AddStudentForm;

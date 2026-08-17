import { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import Spinner from "../components/Spinner";
import ErrorBanner from "../components/ErrorBanner";
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../api/students";

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [editingStudent, setEditingStudent] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    setLoading(true);
    setError("");
    try {
      const res = await fetchStudents();
      setStudents(res.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load students. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleAddOrUpdate(formData) {
    setSubmitting(true);
    setError("");
    try {
      if (editingStudent) {
        const res = await updateStudent(editingStudent._id, formData);
        setStudents((prev) =>
          prev.map((s) => (s._id === editingStudent._id ? res.data.data : s))
        );
        setEditingStudent(null);
      } else {
        const res = await createStudent(formData);
        setStudents((prev) => [res.data.data, ...prev]);
      }
    } catch (err) {
      const message = err.response?.data?.errors
        ? err.response.data.errors.join(" ")
        : err.response?.data?.message || "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }
    setDeletingId(id);
    setError("");
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete student.");
    } finally {
      setDeletingId(null);
    }
  }

  const filteredStudents = useMemo(() => {
    return students.filter((s) =>
      s.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  }, [students, searchTerm]);

  return (
    <div className="app">
      <Navbar />
      <main>
        <section className="card">
          <h2>{editingStudent ? "Edit Student" : "Add New Student"}</h2>
          <StudentForm
            editingStudent={editingStudent}
            onSubmit={handleAddOrUpdate}
            onCancelEdit={() => setEditingStudent(null)}
            submitting={submitting}
          />
        </section>

        <ErrorBanner message={error} onDismiss={() => setError("")} />

        <section className="card">
          <div className="controls">
            <input
              type="text"
              placeholder="🔍 Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="button" className="reset-btn" onClick={loadStudents}>
              🔄 Refresh
            </button>
          </div>
          <p className="student-count">
            Total Students: <strong>{students.length}</strong>
          </p>
        </section>

        <section className="card">
          <h2>Student List</h2>
          {loading ? (
            <Spinner label="Loading students..." />
          ) : (
            <StudentTable
              students={filteredStudents}
              onEdit={setEditingStudent}
              onDelete={handleDelete}
              deletingId={deletingId}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default StudentsPage;

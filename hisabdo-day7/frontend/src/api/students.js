import api from "./axios";

export function fetchStudents() {
  return api.get("/students");
}

export function createStudent(data) {
  return api.post("/students", data);
}

export function updateStudent(id, data) {
  return api.put(`/students/${id}`, data);
}

export function deleteStudent(id) {
  return api.delete(`/students/${id}`);
}

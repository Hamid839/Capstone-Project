// In-memory "database" of students.
// For Day 4 we use a plain array instead of MongoDB.
// Each student: { id, name, email, course, marks }

let students = [
  { id: 1, name: "Aisha Rahman", email: "aisha@example.com", course: "Web Development", marks: 88 },
  { id: 2, name: "Karim Hasan", email: "karim@example.com", course: "Data Science", marks: 72 },
  { id: 3, name: "Nabila Islam", email: "nabila@example.com", course: "UI/UX Design", marks: 91 },
];

// Tracks the next ID to assign to a newly created student.
let nextId = students.length + 1;

function getNextId() {
  return nextId++;
}

module.exports = {
  students,
  getNextId,
};

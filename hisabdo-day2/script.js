// ==========================================================
// Day 2 Task — Student Management Web Page
// Concepts practiced: Variables, Data Types, Arrays, Objects,
// Functions, Loops, Array Methods, DOM Manipulation
// ==========================================================

// ---- Data ----
// Array of Objects: this is our in-memory "database" of students.
let students = [
  { id: 1, name: "Aisha Rahman", email: "aisha@example.com", course: "Web Development", marks: 88 },
  { id: 2, name: "Karim Hasan", email: "karim@example.com", course: "Data Science", marks: 72 },
  { id: 3, name: "Nabila Islam", email: "nabila@example.com", course: "UI/UX Design", marks: 91 },
  { id: 4, name: "Rafi Ahmed", email: "rafi@example.com", course: "MERN Stack", marks: 65 },
];

// Keeps track of the next unique ID to assign to a new student.
let nextId = students.length + 1;

// ---- DOM References ----
const studentForm = document.getElementById("student-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const courseInput = document.getElementById("course");
const marksInput = document.getElementById("marks");

const searchInput = document.getElementById("search-input");
const minMarksInput = document.getElementById("min-marks");
const resetBtn = document.getElementById("reset-btn");

const studentListEl = document.getElementById("student-list");
const studentCountEl = document.getElementById("student-count");
const noResultsEl = document.getElementById("no-results");

// ---- Functions ----

/**
 * Renders a given array of student objects into the table.
 * Uses a loop (forEach) and template strings to build DOM rows.
 */
function renderStudents(list) {
  // Clear existing rows
  studentListEl.innerHTML = "";

  if (list.length === 0) {
    noResultsEl.classList.remove("hidden");
  } else {
    noResultsEl.classList.add("hidden");
  }

  // Loop through each student and create a table row
  list.forEach((student) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.course}</td>
      <td>${student.marks}</td>
      <td><button class="delete-btn" data-id="${student.id}">Delete</button></td>
    `;

    studentListEl.appendChild(row);
  });

  // Update the total student count (based on the FULL list, not filtered)
  studentCountEl.textContent = students.length;
}

/**
 * Adds a new student object to the students array.
 */
function addStudent(name, email, course, marks) {
  const newStudent = {
    id: nextId++,
    name: name.trim(),
    email: email.trim(),
    course: course.trim(),
    marks: Number(marks),
  };

  students.push(newStudent); // Array method: push
  renderStudents(students);
}

/**
 * Removes a student from the array by ID.
 */
function deleteStudent(id) {
  // Array method: filter — creates a new array without the matching student
  students = students.filter((student) => student.id !== id);
  renderStudents(applyFilters());
}

/**
 * Searches students by name (case-insensitive, partial match)
 * AND filters by minimum marks at the same time.
 * Returns the filtered array without mutating the original `students` array.
 */
function applyFilters() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const minMarks = minMarksInput.value !== "" ? Number(minMarksInput.value) : null;

  // Array method: filter
  return students.filter((student) => {
    const matchesName = student.name.toLowerCase().includes(searchTerm);
    const matchesMarks = minMarks === null || student.marks >= minMarks;
    return matchesName && matchesMarks;
  });
}

// ---- Event Listeners ----

// Handle Add Student form submission
studentForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload on form submit

  const name = nameInput.value;
  const email = emailInput.value;
  const course = courseInput.value;
  const marks = marksInput.value;

  if (!name || !email || !course || marks === "") {
    alert("Please fill in all fields.");
    return;
  }

  addStudent(name, email, course, marks);

  // Reset the form after adding
  studentForm.reset();
  nameInput.focus();
});

// Handle Search input (live search as user types)
searchInput.addEventListener("input", () => {
  renderStudents(applyFilters());
});

// Handle Marks filter input (live filter as user types)
minMarksInput.addEventListener("input", () => {
  renderStudents(applyFilters());
});

// Handle Reset button — clears search/filter inputs
resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  minMarksInput.value = "";
  renderStudents(students);
});

// Handle Delete button clicks (event delegation, since rows are dynamic)
studentListEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = Number(e.target.getAttribute("data-id"));
    deleteStudent(id);
  }
});

// ---- Initial Render ----
renderStudents(students);

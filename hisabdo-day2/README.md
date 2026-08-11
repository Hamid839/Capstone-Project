# HisabDo Internship Bootcamp — Day 2 (MERN Track)

## 📚 What I Practiced

- **Variables & Data Types**: `let`, `const`, strings, numbers, and how JS
  handles typing dynamically.
- **Arrays & Objects**: The student list is an **array of objects**, where
  each object represents one student (`id`, `name`, `email`, `course`, `marks`).
- **Functions**: Logic is split into small, reusable functions —
  `renderStudents()`, `addStudent()`, `deleteStudent()`, `applyFilters()`.
- **Loops**: Used `forEach` to loop through the student array and build
  table rows.
- **Array Methods**: Used `push()` to add students, `filter()` to search,
  filter by marks, and delete students immutably.
- **DOM Manipulation**: Created elements dynamically with
  `document.createElement`, updated `innerHTML`, listened for events with
  `addEventListener`, and used **event delegation** for the delete buttons
  (since rows are added dynamically).

## 💻 What I Built

A **Student Management Web Page** using plain **HTML, CSS, and JavaScript**
(no frameworks, as required).

### Features
1. **Display all students** — rendered in a table on page load.
2. **Add a new student** — via a form (name, email, course, marks).
3. **Search students by name** — live search as you type.
4. **Filter students by minimum marks** — live filter, combinable with search.
5. **Display total number of students** — updates automatically.
6. **Delete a student** — bonus feature, using event delegation.

## 📁 Project Structure
```
hisabdo-day2/
├── index.html   → Page structure (form, search/filter controls, table)
├── style.css    → Basic styling
├── script.js    → All JavaScript logic (data, functions, DOM handling)
└── README.md
```

## ▶️ How to Run
No build tools or servers required — it's plain HTML/CSS/JS.

1. Download/clone this folder.
2. Open `index.html` directly in your browser (double-click it, or use
   the "Live Server" extension in VS Code).

## ✅ Day 2 Checklist
- [x] Used HTML for structure
- [x] Used CSS for basic styling
- [x] Used JavaScript for functionality
- [x] Used arrays and objects to store student data
- [x] Used functions to organize logic
- [x] Used DOM manipulation to render and update the page
- [x] No React, Node.js, Express, or MongoDB used — pure JS foundation only

Every part of this code was written and understood step by step, since
upcoming MERN tasks will build on these fundamentals.

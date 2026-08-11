# HisabDo Internship Bootcamp — Day 4 (MERN Track)

## 📚 What I Learned & Practiced

- **Node.js & Express.js**: Built a REST API server using Express, running
  on Node.js.
- **REST API design**: Resource-based routes (`/students`) with standard
  HTTP methods mapped to CRUD operations.
- **HTTP Methods**: `GET`, `POST`, `PUT`, `DELETE`.
- **JSON**: All requests and responses use JSON (`express.json()` middleware
  parses incoming bodies).
- **Route handling**: Used `express.Router()` to organize student routes in
  a separate file.
- **Request/Response handling**: Reading `req.params`, `req.body`, and
  sending structured `res.json()` responses.
- **Basic validation**: Custom middleware validates required fields, email
  format, and marks range before hitting the route handler.
- **Proper status codes**: `200`, `201`, `400`, `404`, `409`, `500` used
  appropriately.
- **Error handling**: 404 handler for unknown routes, a handler for
  malformed JSON, and a global error handler as a safety net.

## 💻 What I Built

A **Student Management REST API** built with **Node.js + Express**, using
an **in-memory array** instead of MongoDB (as allowed for Day 4).

### Student Object Shape
```json
{
  "id": 1,
  "name": "Aisha Rahman",
  "email": "aisha@example.com",
  "course": "Web Development",
  "marks": 88
}
```

## 📁 Project Structure
```
hisabdo-day4/
├── data/
│   └── students.js         → in-memory data store
├── middleware/
│   └── validateStudent.js  → validation for body & :id param
├── routes/
│   └── students.js         → all /students route handlers
├── screenshots/            → API test screenshots
├── server.js                → app entry point, error handlers
├── package.json
└── README.md
```

## ▶️ Installation & Running the API

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start

# Server runs at http://localhost:5000
```

## 🔗 API Endpoints

| Method | Endpoint          | Description              |
|--------|-------------------|---------------------------|
| GET    | `/students`       | Get all students          |
| GET    | `/students/:id`   | Get a single student by ID|
| POST   | `/students`       | Create a new student      |
| PUT    | `/students/:id`   | Update an existing student|
| DELETE | `/students/:id`   | Delete a student           |

## 🧪 Sample Requests & Responses

### ✅ GET `/students` — Success
**Request:** `GET http://localhost:5000/students`

**Response — `200 OK`**
```json
{
  "success": true,
  "count": 3,
  "data": [
    { "id": 1, "name": "Aisha Rahman", "email": "aisha@example.com", "course": "Web Development", "marks": 88 },
    { "id": 2, "name": "Karim Hasan", "email": "karim@example.com", "course": "Data Science", "marks": 72 },
    { "id": 3, "name": "Nabila Islam", "email": "nabila@example.com", "course": "UI/UX Design", "marks": 91 }
  ]
}
```

### ✅ POST `/students` — Success
**Request:** `POST http://localhost:5000/students`
```json
{
  "name": "Rafi Ahmed",
  "email": "rafi@example.com",
  "course": "MERN Stack",
  "marks": 75
}
```
**Response — `201 Created`**
```json
{
  "success": true,
  "message": "Student created successfully.",
  "data": { "id": 4, "name": "Rafi Ahmed", "email": "rafi@example.com", "course": "MERN Stack", "marks": 75 }
}
```

### ❌ GET `/students/abc` — Invalid ID
**Response — `400 Bad Request`**
```json
{
  "success": false,
  "message": "Invalid id \"abc\". ID must be a positive integer."
}
```

### ❌ POST `/students` — Missing Fields
**Request body:**
```json
{ "name": "Incomplete Student" }
```
**Response — `400 Bad Request`**
```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    "email is required and must be a valid email address.",
    "course is required and must be a non-empty string.",
    "marks is required."
  ]
}
```

### ❌ POST `/students` — Invalid Data
**Request body:**
```json
{ "name": "Bad Data", "email": "not-an-email", "course": "Test", "marks": 150 }
```
**Response — `400 Bad Request`**
```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    "email is required and must be a valid email address.",
    "marks must be between 0 and 100."
  ]
}
```

### ❌ DELETE `/students/999` — Not Found
**Response — `404 Not Found`**
```json
{
  "success": false,
  "message": "Student with id 999 not found."
}
```

## 🧪 API Testing

All endpoints were tested for both success and failure cases:
- ✅ Successful requests (GET all, GET one, POST, PUT, DELETE)
- ❌ Invalid ID (non-numeric `:id`)
- ❌ Missing required fields
- ❌ Invalid data (bad email format, marks out of range)
- ❌ Duplicate email on create/update (`409 Conflict`)
- ❌ Requests to unknown routes (`404`)

Screenshots of these test cases are in the `screenshots/` folder:
1. `test-1-get-all-success.png` — GET all students (200)
2. `test-2-post-success.png` — Create a student (201)
3. `test-3-invalid-id.png` — Invalid ID format (400)
4. `test-4-missing-fields.png` — Missing required fields (400)
5. `test-5-invalid-data.png` — Invalid email & out-of-range marks (400)
6. `test-6-delete-not-found.png` — Deleting a non-existent student (404)

> **Note:** These test cases were verified against the running server using
> `curl`; the screenshots render the real requests and responses in a
> Postman-style viewer for clarity. Feel free to re-test with Postman or
> Thunder Client directly using the sample requests above.

## ✅ Day 4 Checklist
- [x] Node.js + Express.js REST API
- [x] All 5 required endpoints implemented
- [x] Proper HTTP methods (GET, POST, PUT, DELETE)
- [x] JSON request/response bodies
- [x] Organized route handling (`express.Router()`)
- [x] Basic validation (required fields, email format, marks range)
- [x] Proper status codes (200, 201, 400, 404, 409, 500)
- [x] Error handling (404 handler, malformed JSON, global error handler)
- [x] In-memory array used instead of MongoDB
- [x] Endpoints tested for success and failure cases

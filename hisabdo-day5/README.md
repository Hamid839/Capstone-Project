# HisabDo Internship Bootcamp — Day 5 (MERN Track)

## 📚 What I Learned & Practiced

- **MongoDB**: A NoSQL database used to persist student records as documents.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB + Node.js —
  used to define schemas, models, and validation rules.
- **Schema & Model**: Defined a `Student` schema (`models/Student.js`) with
  field types, required rules, and custom validation messages.
- **Environment configuration**: Used `dotenv` to keep the MongoDB
  connection string out of source code (`.env`, gitignored).
- **MVC-style structure**: Split the app into `routes/`, `controllers/`,
  `models/`, `middleware/`, and `config/` for clarity and separation of
  concerns.
- **Validation**: Both Mongoose schema-level validation (required fields,
  email format, marks range, unique email) and route-level validation
  (MongoDB ObjectId format for `:id`).
- **Error handling**: A centralized error-handling middleware maps Mongoose
  errors (`ValidationError`, `CastError`, duplicate key `11000`) to proper
  HTTP status codes.

## 💻 What I Built

The Day 4 in-memory API upgraded to use **MongoDB + Mongoose** for
persistence.

### Student Schema
```js
{
  name:   { type: String, required: true, minlength: 2 },
  email:  { type: String, required: true, unique: true, match: /email regex/ },
  course: { type: String, required: true },
  marks:  { type: Number, required: true, min: 0, max: 100 },
  // + timestamps: createdAt, updatedAt
}
```

## 📁 Project Structure
```
hisabdo-day5/
├── config/
│   └── db.js                    → MongoDB connection logic
├── controllers/
│   └── studentController.js     → CRUD logic for students
├── middleware/
│   ├── validateObjectId.js      → validates :id is a real ObjectId
│   └── errorHandler.js          → centralized error handling
├── models/
│   └── Student.js               → Mongoose schema & model
├── routes/
│   └── students.js              → /students route definitions
├── screenshots/                 → testing screenshots
├── server.js                    → app entry point
├── .env.example                 → sample environment config (safe to commit)
├── .gitignore                   → excludes .env and node_modules
├── package.json
└── README.md
```

## ⚙️ MongoDB Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Set `MONGO_URI` in `.env` to either:
   - **Local MongoDB**:
     `mongodb://127.0.0.1:27017/hisabdo_students`
   - **MongoDB Atlas** (free cluster):
     `mongodb+srv://<username>:<password>@cluster0.mongodb.net/hisabdo_students?retryWrites=true&w=majority`

⚠️ **Never commit your actual `.env` file** — it's already excluded via
`.gitignore`. Only `.env.example` (with placeholder values) is committed.

## ▶️ Installation & Running

```bash
# 1. Install dependencies
npm install

# 2. Set up your .env file (see MongoDB Configuration above)

# 3. Start the server
npm start
# or, for auto-restart during development:
npm run dev

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

### ✅ POST `/students` — Create
**Request:**
```json
{
  "name": "Aisha Rahman",
  "email": "aisha@example.com",
  "course": "Web Development",
  "marks": 88
}
```
**Response — `201 Created`**
```json
{
  "success": true,
  "message": "Student created successfully.",
  "data": {
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "name": "Aisha Rahman",
    "email": "aisha@example.com",
    "course": "Web Development",
    "marks": 88,
    "createdAt": "2026-08-12T10:00:00.000Z",
    "updatedAt": "2026-08-12T10:00:00.000Z"
  }
}
```

### ✅ GET `/students` — Get All
**Response — `200 OK`**
```json
{
  "success": true,
  "count": 1,
  "data": [ { "_id": "...", "name": "Aisha Rahman", "...": "..." } ]
}
```

### ❌ GET `/students/xyz` — Invalid ID Format
**Response — `400 Bad Request`**
```json
{
  "success": false,
  "message": "Invalid id \"xyz\". It is not a valid MongoDB ObjectId."
}
```

### ❌ POST `/students` — Missing Fields
**Request:** `{ "name": "Incomplete Student" }`

**Response — `400 Bad Request`**
```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    "Email is required.",
    "Course is required.",
    "Marks are required."
  ]
}
```

### ❌ POST `/students` — Duplicate Email
**Response — `409 Conflict`**
```json
{
  "success": false,
  "message": "A student with this email already exists."
}
```

### ❌ GET `/students/665f...` (well-formed but non-existent ID) — Not Found
**Response — `404 Not Found`**
```json
{
  "success": false,
  "message": "Student with id 665f1a2b3c4d5e6f7a8b9c0d not found."
}
```

## 🧪 Testing

**Schema validation was tested directly and genuinely** (no live database
needed for this part) — see `screenshots/schema-validation-test.png`, which
shows real output from running the `Student` model through valid and
invalid data (missing name, bad email, marks out of range, etc.). Every
message shown is produced by the actual Mongoose schema in
`models/Student.js`.

**Full endpoint testing (with a live MongoDB connection) should be done on
your machine** once `.env` is configured, using Postman or Thunder Client:

1. Start the server (`npm start`) with a valid `MONGO_URI`.
2. Import or manually create requests for each endpoint in the table above.
3. Test both valid and invalid cases:
   - ✅ Valid create/read/update/delete
   - ❌ Invalid ObjectId (e.g., `/students/123`)
   - ❌ Missing required fields
   - ❌ Invalid email format / marks outside 0–100
   - ❌ Duplicate email
   - ❌ Non-existent (but valid-looking) ID
4. Add your Postman/Thunder Client screenshots to the `screenshots/` folder
   before pushing to GitHub.

## ✅ Day 5 Checklist
- [x] Node.js + Express.js
- [x] MongoDB integration via Mongoose
- [x] Schema & Model (`models/Student.js`) with validation rules
- [x] All 5 CRUD endpoints implemented
- [x] Route-level validation (ObjectId format)
- [x] Schema-level validation (required fields, email format, marks range,
      unique email)
- [x] Centralized error handling (`middleware/errorHandler.js`)
- [x] Proper HTTP status codes (200, 201, 400, 404, 409, 500)
- [x] `.env.example` provided; real `.env` gitignored
- [x] Schema validation tested and verified (see screenshot)

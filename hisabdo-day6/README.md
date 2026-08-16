# HisabDo Internship – Day 6 Authentication System

## 📝 Project Description

This is a **Node.js/Express.js/MongoDB authentication REST API** built as part of the HisabDo MERN Stack Internship (Day 6). The project demonstrates a complete authentication system featuring user registration, login, password hashing with bcrypt, JWT token generation, and protected API routes for student management.

The API is secured with JWT authentication middleware and provides protected CRUD endpoints for managing student records. All passwords are securely hashed using bcrypt before storage, and only authenticated users can access protected resources.

---

## ✨ Features

- **User Registration** – Create new users with email and password validation
- **User Login** – Authenticate existing users and receive JWT tokens
- **Password Hashing** – Secure password storage using bcrypt (passwords never stored in plain text)
- **JWT Token Generation** – Generate signed JWT tokens upon successful registration/login
- **JWT Authentication Middleware** – Verify and validate JWT tokens on protected routes
- **Protected Student Routes** – All student CRUD operations require valid JWT authentication
- **Get Current User** – Retrieve authenticated user's profile information
- **Student Management** – Full CRUD operations (Create, Read, Update, Delete) for student records
- **Input Validation** – Comprehensive validation for user inputs and email formats
- **Error Handling** – Centralized error handling with specific error types (ValidationError, CastError, duplicate key errors)
- **MongoDB/Mongoose Integration** – Persistent data storage with schema validation
- **ObjectId Validation** – Middleware to validate MongoDB ObjectId format

---

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | Latest | Runtime environment |
| **Express.js** | 5.2.1 | Web framework and routing |
| **MongoDB** | N/A | NoSQL database |
| **Mongoose** | 9.9.2 | MongoDB schema and validation |
| **jsonwebtoken** | 9.0.3 | JWT generation and verification |
| **bcrypt** | 6.0.0 | Password hashing |
| **dotenv** | 17.4.2 | Environment variable management |
| **nodemon** | 3.1.14 | Development auto-restart (dev dependency) |

---

## 📁 Project Structure

```
hisabdo-day6/
├── config/
│   └── db.js                    # MongoDB connection setup
├── controllers/
│   ├── authController.js        # Authentication logic (register, login, getMe)
│   └── studentController.js     # Student CRUD operations
├── middleware/
│   ├── authMiddleware.js        # JWT verification and authentication
│   ├── errorHandler.js          # Centralized error handling
│   └── validateObjectId.js      # MongoDB ObjectId validation
├── models/
│   ├── User.js                  # User schema with bcrypt password hashing
│   └── Student.js               # Student schema with validation
├── routes/
│   ├── auth.js                  # Authentication endpoints
│   └── students.js              # Student management endpoints
├── utils/
│   └── generateToken.js         # JWT token generation utility
├── screenshots/                 # Screenshots of Postman tests
├── server.js                    # Main Express application entry point
├── package.json                 # Project dependencies and scripts
├── package-lock.json            # Locked dependency versions
├── .env                         # Environment variables (NOT committed)
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── postman_collection.json      # Postman API test collection
└── README.md                    # This file
```

**Important:**
- `.env` contains sensitive credentials and should **never be committed** to Git
- `node_modules/` should **never be committed** – regenerate with `npm install`
- Both are listed in `.gitignore`

---

## ⚙️ Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Port the server runs on (default: 5000)
PORT=5000

# MongoDB connection string
# For local MongoDB: mongodb://127.0.0.1:27017/hisabdo_auth
# For MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/hisabdo_auth
MONGO_URI=your_mongodb_connection_string_here

# Secret key used to sign JWT tokens
# Generate a secure key: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_super_secret_jwt_key_here

# JWT token expiration time (default: 1d)
# Format: 1h, 1d, 7d, 30d, etc.
JWT_EXPIRE=1d
```

**Reference:** See `.env.example` in the project for a template.

---

## 🚀 Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas account)

### Step-by-Step Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd hisabdo-day6
   ```

2. **Navigate to the project folder:**
   ```bash
   cd hisabdo-day6
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create a `.env` file:**
   ```bash
   cp .env.example .env
   ```

5. **Configure environment variables:**
   - Open `.env` with your text editor
   - Set `MONGO_URI` to your MongoDB connection string
   - Set `JWT_SECRET` to a secure random string
   - Set `JWT_EXPIRE` (optional, defaults to "1d")
   - Set `PORT` (optional, defaults to 5000)

6. **Start the server:**
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

7. **Verify the server is running:**
   - Open your browser or API client
   - Navigate to `http://localhost:5000`
   - You should see a welcome message confirming the API is running

---

## 🔐 Authentication API Endpoints

### **POST /api/auth/register**

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "67a1f2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (409 Conflict – Duplicate Email):**
```json
{
  "success": false,
  "message": "A user with this email already exists."
}
```

**Error Response (400 Bad Request – Missing Fields):**
```json
{
  "success": false,
  "message": "Please provide name, email, and password."
}
```

---

### **POST /api/auth/login**

Authenticate an existing user and receive a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "67a1f2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (401 Unauthorized – Invalid Credentials):**
```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

---

### **GET /api/auth/me** *(Protected)*

Retrieve the authenticated user's profile information.

**Requirements:**
- Valid JWT token in `Authorization` header
- Format: `Authorization: Bearer <JWT_TOKEN>`

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "67a1f2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (401 Unauthorized – Missing Token):**
```json
{
  "success": false,
  "message": "Not authorized. No token provided."
}
```

**Error Response (401 Unauthorized – Invalid Token):**
```json
{
  "success": false,
  "message": "Not authorized. Invalid token."
}
```

---

## 📚 Student API Endpoints

All student endpoints are **protected** and require valid JWT authentication.

**Authentication Header Required:**
```
Authorization: Bearer <JWT_TOKEN>
```

### **GET /api/students** *(Protected)*

Retrieve all student records.

**Success Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "67b2e3d4c5f6g7h8i9j0k1l2",
      "name": "Ali Khan",
      "email": "ali@example.com",
      "course": "JavaScript Fundamentals",
      "marks": 92,
      "createdBy": "67a1f2c3d4e5f6g7h8i9j0k1",
      "createdAt": "2026-08-16T10:30:00.000Z",
      "updatedAt": "2026-08-16T10:30:00.000Z"
    },
    {
      "_id": "67b2e3d4c5f6g7h8i9j0k1l3",
      "name": "Aisha Rahman",
      "email": "aisha@example.com",
      "course": "React Mastery",
      "marks": 88,
      "createdBy": "67a1f2c3d4e5f6g7h8i9j0k1",
      "createdAt": "2026-08-16T11:15:00.000Z",
      "updatedAt": "2026-08-16T11:15:00.000Z"
    }
  ]
}
```

---

### **GET /api/students/:id** *(Protected)*

Retrieve a specific student by ID.

**Parameters:**
- `id` – MongoDB ObjectId of the student

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "67b2e3d4c5f6g7h8i9j0k1l2",
    "name": "Ali Khan",
    "email": "ali@example.com",
    "course": "JavaScript Fundamentals",
    "marks": 92,
    "createdBy": "67a1f2c3d4e5f6g7h8i9j0k1",
    "createdAt": "2026-08-16T10:30:00.000Z",
    "updatedAt": "2026-08-16T10:30:00.000Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Student with id 67b2e3d4c5f6g7h8i9j0k1l2 not found."
}
```

---

### **POST /api/students** *(Protected)*

Create a new student record.

**Request Body:**
```json
{
  "name": "Fatima Ahmed",
  "email": "fatima@example.com",
  "course": "Node.js Backend",
  "marks": 85
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Student created successfully.",
  "data": {
    "_id": "67b2e3d4c5f6g7h8i9j0k1l4",
    "name": "Fatima Ahmed",
    "email": "fatima@example.com",
    "course": "Node.js Backend",
    "marks": 85,
    "createdBy": "67a1f2c3d4e5f6g7h8i9j0k1",
    "createdAt": "2026-08-16T12:00:00.000Z",
    "updatedAt": "2026-08-16T12:00:00.000Z"
  }
}
```

---

### **PUT /api/students/:id** *(Protected)*

Update an existing student record.

**Parameters:**
- `id` – MongoDB ObjectId of the student

**Request Body:**
```json
{
  "name": "Ali Khan Updated",
  "email": "ali.updated@example.com",
  "course": "Advanced JavaScript",
  "marks": 95
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Student updated successfully.",
  "data": {
    "_id": "67b2e3d4c5f6g7h8i9j0k1l2",
    "name": "Ali Khan Updated",
    "email": "ali.updated@example.com",
    "course": "Advanced JavaScript",
    "marks": 95,
    "createdBy": "67a1f2c3d4e5f6g7h8i9j0k1",
    "createdAt": "2026-08-16T10:30:00.000Z",
    "updatedAt": "2026-08-16T12:30:00.000Z"
  }
}
```

---

### **DELETE /api/students/:id** *(Protected)*

Delete a student record.

**Parameters:**
- `id` – MongoDB ObjectId of the student

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Student deleted successfully.",
  "data": {
    "_id": "67b2e3d4c5f6g7h8i9j0k1l2",
    "name": "Ali Khan",
    "email": "ali@example.com",
    "course": "JavaScript Fundamentals",
    "marks": 92,
    "createdBy": "67a1f2c3d4e5f6g7h8i9j0k1",
    "createdAt": "2026-08-16T10:30:00.000Z",
    "updatedAt": "2026-08-16T10:30:00.000Z"
  }
}
```

---

## 🔄 Authentication Flow

### **Registration Flow**
1. User submits registration request with name, email, and password
2. Server validates input (all fields required, email format check)
3. Server checks if email already exists in database
4. Password is hashed using bcrypt with salt rounds = 10
5. User document is created and saved to MongoDB
6. JWT token is generated with user's ID and 1-day expiration
7. Server returns token and user data (password NOT included)
8. Client stores token for subsequent authenticated requests

### **Login Flow**
1. User submits login request with email and password
2. Server validates input (both fields required)
3. Server retrieves user from database (explicitly selecting password field)
4. Server compares submitted password with stored bcrypt hash
5. If password matches, JWT token is generated
6. Server returns token and user data (password NOT included)
7. If password doesn't match, 401 Unauthorized error is returned

### **Protected Request Flow**
1. Client sends request to protected endpoint with `Authorization: Bearer <token>` header
2. Authentication middleware extracts token from header
3. Middleware verifies JWT signature using JWT_SECRET
4. Middleware decodes token to extract user ID
5. Middleware retrieves user from database
6. User is attached to `req.user` object
7. Request proceeds to route handler with authenticated user available
8. If token is missing, malformed, or invalid, 401 error is returned

---

## 🔒 Password Security

- **Bcrypt Hashing:** All passwords are hashed using bcrypt before storage in MongoDB
- **Plain Text Never Stored:** Passwords are never stored, logged, or transmitted in plain text
- **Password Not Returned:** API responses never include the password field, even for authenticated users
- **Automatic Hashing:** Passwords are automatically hashed via a Mongoose pre-save hook before database storage
- **Secure Comparison:** Password verification uses bcrypt's built-in comparison method
- **Minimum Requirements:** Passwords must be at least 6 characters long

---

## 🔑 JWT Authentication

- **Token Generation:** JWT tokens are generated after successful user registration or login
- **Token Structure:** JWT contains the authenticated user's MongoDB ID (`{ id: userId }`)
- **Secret Management:** JWT tokens are signed using a secret key from `JWT_SECRET` environment variable
- **Token Expiration:** Tokens expire after the period specified in `JWT_EXPIRE` (default: 1 day)
- **Bearer Format:** Protected routes require tokens in the format: `Authorization: Bearer <TOKEN>`
- **Middleware Validation:** All protected routes validate token signature, expiration, and user existence
- **Specific Errors:** Clear error messages indicate missing tokens, expired tokens, or invalid tokens

---

## 📮 Postman API Testing

The project includes a `postman_collection.json` file with comprehensive test cases for all endpoints.

### **Import the Collection:**
1. Open Postman
2. Click "Import" in the top-left
3. Select `postman_collection.json` from the project folder
4. All requests and variables will be pre-configured

### **Key Testing Scenarios:**

#### **1. Registration (Success)**
```
POST /api/auth/register
Body: { "name": "Test User", "email": "test@example.com", "password": "password123" }
Expected: 201 Created, token returned
```

#### **2. Registration (Duplicate Email)**
```
POST /api/auth/register
Body: { "name": "Another User", "email": "test@example.com", "password": "password456" }
Expected: 409 Conflict, duplicate email error
```

#### **3. Login (Success)**
```
POST /api/auth/login
Body: { "email": "test@example.com", "password": "password123" }
Expected: 200 OK, token returned
```

#### **4. Login (Wrong Password)**
```
POST /api/auth/login
Body: { "email": "test@example.com", "password": "wrongpassword" }
Expected: 401 Unauthorized, invalid credentials error
```

#### **5. Protected Route (Valid JWT)**
```
GET /api/auth/me
Header: Authorization: Bearer <token_from_login>
Expected: 200 OK, user profile returned
```

#### **6. Protected Route (Missing JWT)**
```
GET /api/auth/me
Expected: 401 Unauthorized, no token error
```

#### **7. Protected Route (Invalid JWT)**
```
GET /api/auth/me
Header: Authorization: Bearer invalidtoken123
Expected: 401 Unauthorized, invalid token error
```

#### **8. Create Student (Protected)**
```
POST /api/students
Header: Authorization: Bearer <token>
Body: { "name": "Ali Khan", "email": "ali@example.com", "course": "JavaScript", "marks": 92 }
Expected: 201 Created, student record returned
```

#### **9. Get All Students (Protected)**
```
GET /api/students
Header: Authorization: Bearer <token>
Expected: 200 OK, array of students returned
```

---

## 📸 Screenshots

The `screenshots/` folder contains Postman test screenshots documenting:
- Successful user registration with JWT token generation
- Duplicate email validation
- Successful user login
- Wrong password error handling
- Protected route access with valid JWT
- Protected route rejection without JWT
- Invalid JWT token rejection
- Protected student creation
- Protected student retrieval and management

All screenshots demonstrate that the authentication system is working correctly and meets Day 6 requirements.

---

## 🔐 Security & GitHub Notes

### **Critical – Never Commit:**
- **`.env` file** – Contains sensitive credentials (JWT_SECRET, MONGO_URI)
- **`node_modules/` folder** – Regenerate with `npm install` on each system
- **Passwords** – Never store, log, or transmit in plain text

### **Already Configured:**
- `.env` is listed in `.gitignore` – it won't be committed
- `node_modules/` is listed in `.gitignore` – it won't be committed
- Only `.env.example` (with placeholder values) should be committed

### **Best Practices:**
1. Generate a strong JWT_SECRET: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
2. Use a secure MongoDB connection string (preferably MongoDB Atlas)
3. Keep JWT_SECRET confidential and change it periodically
4. Rotate JWT_SECRET in production by issuing new tokens
5. Use HTTPS in production (tokens transmitted in headers)

---

## ▶️ How to Run

### **Development Mode (with auto-restart):**
```bash
npm run dev
```
The server will restart automatically whenever you modify source files.

### **Production Mode:**
```bash
npm start
```
The server runs once without auto-restart.

### **Verify Server is Running:**
```bash
curl http://localhost:5000
```

You should receive:
```json
{
  "success": true,
  "message": "Student Management API with JWT Authentication 🚀",
  "endpoints": {
    "register": "POST /api/auth/register",
    "login": "POST /api/auth/login",
    "me": "GET /api/auth/me (protected)",
    "students": "GET/POST /api/students (protected)",
    "studentById": "GET/PUT/DELETE /api/students/:id (protected)"
  }
}
```

---

## ✅ Day 6 Internship Task Completion

The following Day 6 requirements have been successfully implemented:

- [x] **User Registration API** – `POST /api/auth/register`
- [x] **User Login API** – `POST /api/auth/login`
- [x] **bcrypt Password Hashing** – Automatic pre-save hook in User model
- [x] **JWT Token Generation** – `generateToken()` utility with configurable expiration
- [x] **Authentication Middleware** – `authMiddleware.js` validates and verifies JWT
- [x] **Protected Routes** – All `/api/students` endpoints require valid JWT
- [x] **Node.js** – Runtime environment
- [x] **Express.js** – Web framework and routing
- [x] **MongoDB** – NoSQL database
- [x] **Mongoose** – Schema validation and ODM
- [x] **JWT (jsonwebtoken)** – Token generation and verification
- [x] **bcrypt** – Password hashing library
- [x] **Middleware** – Custom middleware for auth, error handling, and validation
- [x] **Protected REST APIs** – Authenticated student CRUD endpoints
- [x] **Postman API Testing** – Comprehensive test collection included

---

## 📖 Additional Notes

- **Database Connection:** The app connects to MongoDB on startup. If connection fails, the process exits with an error message.
- **Error Handling:** All endpoints use centralized error handling that catches validation errors, database errors, and custom errors.
- **Email Validation:** User and student emails must be unique and match valid email format.
- **Validation:** Names require minimum 2 characters, marks must be between 0-100, courses are required.
- **Request Validation:** Missing required fields return 400 Bad Request with clear messages.
- **Status Codes:** Proper HTTP status codes (201 Created, 200 OK, 400 Bad Request, 401 Unauthorized, 404 Not Found, 409 Conflict, 500 Server Error).

---

## 📞 Support

For issues or questions:
1. Check your `.env` configuration
2. Verify MongoDB connection string is correct
3. Ensure all dependencies are installed: `npm install`
4. Check server logs for error messages
5. Review the authentication flow documentation above

---

**Project Status:** ✅ Complete and ready for Day 6 submission  
**Last Updated:** August 16, 2026  
**Internship Track:** MERN Stack (Node.js/Express.js/MongoDB/React)

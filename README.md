📝Task Management Application (Full Stack)

🚀 Live Demo

🔗 Frontend (Vercel):
https://task-management-app-xi-six.vercel.app

🔗 Backend (Render):
https://task-management-app-47es.onrender.com

---

📌 Project Overview

This is a production-ready Full Stack Task Management Application built as part of a technical assessment.

The application demonstrates:

Secure authentication using JWT

HTTP-only cookie storage

AES encryption for sensitive data

Proper authorization (user-specific task access)

Pagination, filtering, and search

Clean backend architecture

Production deployment with environment variable management

---

🛠 Tech Stack

Backend

Node.js

Express.js

MongoDB (Atlas)

JWT Authentication

bcrypt (password hashing)

CryptoJS (AES encryption)

CORS + Secure Cookies

Render (Deployment)

Frontend

Next.js (App Router)

Axios

Tailwind CSS

Protected Routes

Vercel (Deployment)

---

🔐 Authentication & Security

1️⃣ Password Security

Passwords are hashed using bcrypt

Plain passwords are never stored

2️⃣ JWT Authentication

JWT token generated on login

Stored in HTTP-only cookies

Prevents XSS token theft

3️⃣ Secure Cookie Configuration

httpOnly: true
secure: true
sameSite: "none"

4️⃣ AES Encryption

Task descriptions are encrypted before saving to database using AES.

Encrypted in DB → Decrypted before response.

5️⃣ Authorization

Users can only access their own tasks:

Task.find({ user: req.user.\_id })

---

📦 Features

✅ User Registration

✅ User Login

✅ JWT-based authentication

✅ Secure HTTP-only cookies

✅ Logout functionality

✅ Create Task

✅ Update Task

✅ Delete Task

✅ Pagination

✅ Filter by status

✅ Search by title

✅ Protected frontend routes

✅ Production deployment

---

📊 API Documentation

🔹 Register

POST /api/auth/register

Body:

{
"name": "Rahul",
"email": "rahul@gmail.com",
"password": "Rahul@1234"
}

---

🔹 Login

POST /api/auth/login

Returns HTTP-only cookie with JWT.

---

🔹 Logout

POST /api/auth/logout

Clears authentication cookie.

---

🔹 Create Task

POST /api/tasks

{
"title": "Complete Assignment",
"description": "Finish full stack project"
}

---

🔹 Get Tasks (Pagination + Filter + Search)

GET /api/tasks?page=1&limit=5&status=pending&search=project

Query Parameters:

page – Page number

limit – Items per page

status – pending / completed

search – Title search keyword

---

🔹 Update Task

PUT /api/tasks/:id

---

🔹 Delete Task

DELETE /api/tasks/:id

---

🏗 Architecture Overview

Backend Structure

backend/
├── src/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── app.js
│ └── server.js

Frontend Structure

frontend/
├── app/
│ ├── login/
│ ├── register/
│ ├── dashboard/
│ └── middleware.js
└── lib/axios.js

---

🌍 Deployment

Backend

Hosted on Render

Environment variables configured in dashboard

Uses process.env.PORT

Frontend

Hosted on Vercel

Connected to backend via environment variable:

NEXT_PUBLIC_API_URL=https://task-management-app-47es.onrender.com/api

---

🔑 Environment Variables

Backend (.env)

PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
AES_SECRET=your_aes_secret
JWT_EXPIRE=1d
FRONTEND_URL=https://your-frontend-url.vercel.app
NODE_ENV=production

Frontend (.env.local)

NEXT_PUBLIC_API_URL=https://your-backend-url/api

---

🧠 Key Implementation Decisions

Used HTTP-only cookies instead of localStorage for better security

Encrypted task descriptions using AES for data protection

Implemented pagination using MongoDB .skip() and .limit()

Used regex-based search for title filtering

Structured backend with separation of concerns (MVC pattern)

Prevented hardcoding secrets using environment variables

---

📈 Evaluation Criteria Coverage

✔ Clean Code Architecture

✔ Secure Authentication

✔ Proper Database Design

✔ Structured Error Handling

✔ Frontend Integration

✔ Deployment Strategy

✔ Documentation

---

👤 Author

Rahul Sinha
Full Stack Developer (MERN Stack)

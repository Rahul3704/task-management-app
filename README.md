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

👤 Author

Rahul Sinha
Full Stack Developer (MERN Stack)

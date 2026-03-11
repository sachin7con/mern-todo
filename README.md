# ✅ TaskMaster: Secure Full-Stack Todo App

A production-ready Todo application built with the **MERN Stack**, featuring robust **JWT-based authentication** and secure **CRUD** operations.

---

## 🚀 Live Demo
[Insert your Vercel/Render Link Here]

## 🛡️ Security Features
- **JWT Authentication**: Secure login using JSON Web Tokens stored in HTTP-only cookies/local storage.
- **Protected Routes**: Middleware ensures only authenticated users can access their personal tasks.
- **Password Hashing**: Uses `bcryptjs` to securely hash passwords before storing them in MongoDB.
- **Secure CRUD**: Backend validation ensures users can only Edit/Delete their own tasks.

## ✨ Features
- **Full Auth Flow**: Register, Login, and Logout functionality.
- **Task Management**: Create, Read, Update (Toggle Complete), and Delete tasks.
- **Responsive UI**: Clean, mobile-friendly interface built with **Tailwind CSS**.
- **State Management**: Managed using **React Context API** (or Redux).

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Security**: JWT (jsonwebtoken), Bcryptjs

## 📁 Project Structure
```text
├── backend/
│   ├── models/      # MongoDB Schemas (User, Todo)
│   ├── routes/      # Auth & Task API Endpoints
│   ├── middleware/  # JWT Verification Logic
│   └── controllers/ # Business Logic for CRUD
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # Auth & Task State
│   │   └── pages/      # Login, Signup, Dashboard

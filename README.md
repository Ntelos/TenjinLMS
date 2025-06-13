# TenjinLMS

A modern, secure, and easy-to-use **Learning Management System (LMS)** designed for **secondary education**. Developed as the technical part of my thesis at the International Hellenic University.

---

## 🧩 About the Project

**TenjinLMS** is a web-based platform aimed at improving educational administration and communication in Greek secondary schools. It provides digital tools for:

- Managing school staff, students, and classes
- Organizing teaching and academic schedules
- Supporting students with personalized dashboards
- Enhancing engagement through gamification

The system is designed with modular architecture, ensuring scalability, usability, and data security.

---

## 🎯 Key Features

### 👩‍🏫 School Administration
- Manage student and teacher accounts
- Create and organize academic classes and subjects
- Track school-wide educational data per academic year

### 👨‍🏫 Teachers
- Manage classes and teaching subjects
- Assign and grade student work
- Track student attendance and reward progress with points

### 👨‍🎓 Students
- View grades, absences, and assignments
- Access course materials and deadlines
- Get feedback from teachers and monitor their performance

### 🔐 Security
- Role-based access control
- JWT-based authentication
- Password hashing with bcrypt
- Validation for all input fields and protected API routes

---

## 🛠️ Tech Stack

| Layer        | Technology         |
|--------------|--------------------|
| Frontend     | Vue.js             |
| Backend      | Node.js + Express  |
| ORM          | Prisma             |
| Database     | MySQL              |
| Auth         | JWT, bcrypt        |
| Tools        | Postman, Prisma Studio |

---

## 📂 Repository Structure

```bash
TenjinLMS/
│
├── backend/          # Node.js REST API
├── frontend/         # Vue.js Single Page Application
├── prisma/           # Prisma schema and migrations
├── docs/             # Thesis PDF, ER diagrams, API docs
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v16+
- MySQL v8+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ntelos/TenjinLMS
   cd TenjinLMS
   ```

2. Configure environment variables:
   - Create `.env` files in `/backend/` and `/frontend/`
   - Add your MySQL credentials, JWT secret, etc.

3. Install dependencies:
   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install
   ```

4. Run development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend app
   cd ../frontend
   npm run serve
   ```

---

## 📖 Documentation

The full thesis (in Greek) includes:

- 📘 Learning Management System theory & history
- 🧱 System Design and ERD diagrams
- 🔐 API endpoint structure and security methods
- 🧪 Testing using Postman and dummy data
- 👨‍💼 Complete User Manual (School, Teacher, Student)

---

## 🤝 Acknowledgments

Special thanks to:

- **Dr. Georgios Lampropoulos** – Academic Supervisor  
- Faculty of Informatics and Electronic Systems  
- My family and close friends for their support  

---

## 📃 License

This project is provided for educational and research purposes only.  
For any other use, please contact the author.

---

## 🔗 Author

**Panteleimon Kampouris**
Department of Information and Electronic Engineering
Faculty of Informatics and Electronic Systems 
International Hellenic University  

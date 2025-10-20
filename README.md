# 🎓 E-Learning Platform Backend

Backend for an **E-Learning platform** built with **Node.js, Express, and MongoDB**.  
This project provides APIs for managing **Users, Courses, Lectures, Quizzes, and Quiz Results**, along with **Authentication, Authorization, and Payment Integration (Paymob)**.

---

## 🚀 Features

### 👤 User Management
- User registration & secure login with JWT  
- Profile management  
- Role-based access (Student, Instructor, Admin)

### 🔑 Authentication & Authorization
- JWT-based authentication  
- Password encryption with bcrypt  
- Middleware-protected routes  
- Role-based permissions  

### 📚 Course Management
- Full CRUD operations for courses  
- Categorization by subject and level  
- Student enrollment system  
- Track enrolled students  

### 🎥 Lecture Management
- Full CRUD operations for lectures  
- Video content integration via hosted links  
- Link lectures to courses  
- Assign quizzes to lectures  

### 📝 Quiz System
- Create and manage quizzes per lecture  
- Support multiple questions and options  
- Validate correct answers  
- Update & delete quizzes  

### 📊 Quiz Results
- Submit answers and auto-evaluate results  
- Track scores, attempts, and pass/fail status  
- Store student quiz history  
- Retrieve results per student or quiz  

### 💳 Payments
- Integrated with **Paymob** for secure payments  
- Supports multiple payment methods (Cards & Wallets)  
- Payment key generation & iframe integration  
- Webhook handling with **HMAC verification**  
- Track payment/order status (pending, paid, failed)  

### ⚙️ System & Tools
- Node.js + Express.js backend  
- MongoDB + Mongoose for database  
- Tested with Postman collection  
- Clean architecture with Controllers, Routes, Models, Middleware, and Services  

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **Auth** | JWT, bcrypt |
| **Payment** | Paymob |
| **Testing** | Postman |

---

## ⚙️ Installation

### 1️⃣ Clone the repo:
```bash
git clone https://github.com/your-username/E-learning-Backend.git
cd E-learning-Backend
```

### 2️⃣ Install dependencies:
```bash
npm install
```

### 3️⃣ Create `.env` file:
```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
PAYMOB_API_KEY=your_paymob_api_key
PAYMOB_INTEGRATION_ID_CARD=your_card_integration_id
PAYMOB_INTEGRATION_ID_WALLET=your_wallet_integration_id
PAYMOB_IFRAME_ID=your_iframe_id
PAYMOB_HMAC_SECRET=your_hmac_secret
PORT=4000
```

### 4️⃣ Run server:
```bash
npm start
```

Server will run on:  
👉 `http://localhost:4000`

---

## 📌 API Documentation

All API endpoints are documented in the Postman Collection.  
You can import the file: **`E-Learning API.postman_collection.json`** into Postman.

---

## 🔑 Authentication
| Method | Endpoint | Description |
|--------|-----------|-------------|
| **POST** | `/api/auth/signup` | Register new user |
| **POST** | `/api/auth/login` | Login & get JWT |

---

## 📚 Courses
| Method | Endpoint | Description |
|--------|-----------|-------------|
| **POST** | `/api/courses/create` | Create course |
| **GET** | `/api/courses/list` | Get all courses |
| **GET** | `/api/courses/list-by-id/:id` | Get course by ID |
| **PUT** | `/api/courses/update/:id` | Update course |
| **DELETE** | `/api/courses/delete/:id` | Delete course |
| **POST** | `/api/courses/enroll-std/:id` | Enroll student |

---

## 🎥 Lectures
| Method | Endpoint | Description |
|--------|-----------|-------------|
| **POST** | `/api/lectures/create` | Create lecture |
| **GET** | `/api/lectures/list` | Get all lectures |
| **GET** | `/api/lectures/get-by-id/:id` | Get lecture by ID |
| **PUT** | `/api/lectures/update/:id` | Update lecture |
| **DELETE** | `/api/lectures/delete/:id` | Delete lecture |

---

## 📝 Quizzes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| **POST** | `/api/quizzes/create` | Create quiz |
| **GET** | `/api/quizzes/get-quizzes` | List all quizzes |
| **GET** | `/api/quizzes/get-by-id/:id` | Get quiz by ID |
| **PUT** | `/api/quizzes/update/:id` | Update quiz |
| **DELETE** | `/api/quizzes/delete/:id` | Delete quiz |

---

## 📊 Quiz Results
| Method | Endpoint | Description |
|--------|-----------|-------------|
| **POST** | `/api/quiz-results/submit` | Submit quiz answers |
| **GET** | `/api/quiz-results/student/:id` | Get student results |
| **GET** | `/api/quiz-results/all-result` | List all results |

---

## 📬 Postman Collection

You can find the full Postman Collection with all endpoints inside this repository.

👉 **Download:** `E-Learning API.postman_collection.json`  

### 🧭 How to Import in Postman
1. Download the file from the repo.  
2. Open **Postman → Import**.  
3. Select the JSON file.  
4. You’ll get all API endpoints ready to test!  

---

## 📁 Project Structure

```
E-Learning-Backend/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   └── app.js
│
├── config/
│   └── db.connection.js
│
├── .env
├── package.json
└── README.md
```

---

## 👨‍💻 Author

**Abdelmonem Adel**  
[GitHub Profile](https://github.com/Abdelmonem-Adel)

---

⭐ **If you like this project, don’t forget to star the repo and follow the author!**

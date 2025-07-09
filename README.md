<<<<<<< HEAD

# 🎉 Event Management System – DSA & AIML Approach

A smart, AI-powered platform designed to automate and optimize event planning — from venue discovery to booking confirmation — integrating classical algorithms and modern web technologies.

---

## 🧩 Overview

This project addresses inefficiencies in traditional event booking systems by combining **data structures, Generative AI**, and **secure online payments** in a **MERN Stack** application. It enables **Belagavi residents** to book event venues with ease while providing event managers with tools to manage listings, payments, and system performance.

---

## 🔧 Tech Stack

| Layer          | Technology Used                                |
|----------------|------------------------------------------------|
| 💻 Frontend     | ReactJS, Tailwind CSS, React-Router            |
| 🧠 AI/Chatbot   | Python, Hugging Face Transformers, Flask       |
| 🗂️ Backend      | Node.js, Express.js, JWT, Razorpay API         |
| 🧮 Algorithms   | Dijkstra’s (Shortest Path for Venue Suggestion)|
| ☁️ Database     | MongoDB Atlas (Cloud NoSQL DB)                 |

---

## 🎯 Key Features

### 📍 Venue Recommendation
- Implements Dijkstra's algorithm for nearest and optimal venue search based on:
  - Location
  - Capacity
  - Amenities

### 💬 GenAI Chatbot
- Built using **Transformer-based models**
- Handles user queries about event types, venue details, availability, etc.
- 92%+ response accuracy in testing

### 💳 Secure Payment Gateway
- Integrated with **Razorpay API**
- Validates and confirms transactions
- Auto-generates digital receipts (PDF)

### 📈 Real-time Monitoring
- Tracks latency of critical endpoints
- Logs booking, chatbot, and payment activities

---

## 🧪 Functional Architecture

### 👤 User Capabilities
- Search, filter, and book venues
- Chatbot assistance
- Make secure online payments
- Download booking receipts

### 🔐 Admin Capabilities
- Add/edit/delete venue listings
- View all bookings and payments
- Dashboard with analytics

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/event-management-system.git
cd event-management-system
````

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file with:

```env
MONGO_URI=your_mongo_connection_string
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET_KEY=your_secret
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

---

## 🧪 Testing Strategy

| Test Type           | Tools Used | Focus                                  |
| ------------------- | ---------- | -------------------------------------- |
| Unit Testing        | JS/Python  | Algorithm & Chatbot logic              |
| Integration Testing | Postman    | Booking + Payment API flow             |
| UAT                 | End Users  | Usability, accessibility, satisfaction |

---

## 📊 System Outcomes

* 🔎 Venue Recommendation Accuracy: **Fast & optimal**
* 🤖 Chatbot Accuracy: **\~92%**
* 💸 Payment Uptime: **100% (Tested under load)**
* 📉 Latency: **Low across user sessions**

---

## 📐 UML & Diagrams

* 🧾 Use Case & Admin Diagrams
* 🔁 Sequence Flow from React → Node → Razorpay/MongoDB
* 📌 Booking Flow: User → Venue → Payment → Receipt

(Diagrams available in [Project Documentation](./docs/Minor%20report.pdf))

---

## 📂 Folder Structure

```
📁 event-management-system
├── 📁 frontend
│   └── ReactJS App with chatbot & Razorpay UI
├── 📁 backend
│   ├── Node.js + Express routes
│   └── Venue / Booking / Payment APIs
├── 📁 chatbot
│   └── Flask server with GenAI responses
└── 📄 Minor_Report.pdf
```

---

## 🎓 Developed By

**Team Members (CSE, KLE Tech, Belagavi)**

* Prashant Uppar (02FE22BCS069)
* Anurag Chougule (02FE22BCS021)
* Chandni Kumari (02FE22BCS026)
* Vanashree A N (02FE22BCS171)

👨‍🏫 **Guided By**: *Dr. Priyanka Gavade*

---

## 📄 License

This project is open-sourced under the [MIT License](./LICENSE).

---

## 📬 Contact & Acknowledgment

Thanks to:

* Razorpay for Payment APIs
* Hugging Face for Transformers
* MongoDB Atlas for free-tier DB hosting
* KLE Tech for academic support and infrastructure

📧 For queries, reach out at: \[[prashantuppar2004@gmail.com](mailto:your-email@example.com)]


=======
# Event_management_System_DSA_approach
Minor Project 
>>>>>>> 210e740aff6f04fcd7324867c5798d476a0aaa9e

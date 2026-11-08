# Sweety – Blood Glucose Tracker 🩸

A clean, responsive, and intuitive blood glucose tracking web application designed for diabetes patients to log up to 4 readings a day and view insightful daily, month-to-date, and previous-month reports.

Built for the **Junior Full Stack Developer – JavaScript & AI** assignment at **Kenpath**.

---

## 🚀 Tech Stack

### Frontend
- **Framework:** React 18 with [Vite](https://vitejs.dev/)
- **Routing:** Modern React Router (`createBrowserRouter`, lazy loading with `React.lazy` & `Suspense`)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Validation:** [Zod](https://zod.dev/) schemas
- **Visuals & Charts:** [Recharts](https://recharts.org/) (Interactive trend lines)
- **Icons:** [Lucide React](https://lucide.dev/)

### Backend
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database & ORM:** PostgreSQL with [Prisma](https://www.prisma.io/)
- **Security:** bcrypt password hashing & JSON Web Tokens (JWT)
- **Validation:** Joi (backend schema validation)

---

## 📁 Project Architecture

```
SweetyGlucoseTracker/
├── docker-compose.yml       # Docker Compose for PostgreSQL database
├── backend/
│   ├── config/              # Prisma client and database config
│   ├── controllers/         # Auth, reading, and report controllers
│   ├── middleware/          # JWT authentication and request validation
│   ├── prisma/              # Schema, migrations, and seed script
│   ├── routes/              # Express API route declarations
│   ├── validations/         # Request validation schemas (Joi)
│   ├── app.js               # Express application configuration
│   └── index.js             # Server entry point
└── frontend/
    └── src/
        ├── api/             # API client & services (authApi, readingApi, reportApi)
        ├── components/
        │   ├── common/      # Navbar, Modal, Button, Input, Select, StatCard, Pagination, etc.
        │   ├── readings/    # ReadingTable, ReadingCard, ReadingFormModal, Badges, etc.
        │   └── reports/     # ReportSummaryCard, DailyReadingsList, TrendChart, DateSelector
        ├── context/         # AuthContext (user state, login, register, logout)
        ├── pages/           # DashboardPage, ReadingsPage, ReportsPage, LoginPage, RegisterPage
        ├── routes/          # router.jsx & routerConfig.jsx (Lazy routes & Protected wrapper)
        ├── schemas/         # Client-side Zod validation schemas
        └── utils/           # Formatters, slot helpers, and constants
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **PostgreSQL**: Installed locally or running via Docker

---

### Step 1: Start PostgreSQL (Docker)

If using Docker:
```bash
docker compose up -d
```
This spins up PostgreSQL on port `5432` with username `postgres`, password `password123`, and database `sweety`.

---

### Step 2: Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   *Verify your `DATABASE_URL` matches your PostgreSQL configuration.*
4. Run migrations and seed sample data:
   ```bash
   npm run seed
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend API will run on **`http://localhost:5001`**.

---

### Step 3: Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   Open **`http://localhost:3000`** in your browser.

---

## 👤 Demo Credentials

A seed script is provided that creates a ready-to-test user with sample readings:

- **Email:** `demo@sweety.com`
- **Password:** `password123`

*(The login page also provides a 1-click "Autofill" button for quick testing).*

---

## ✨ Features Implemented

### 1. Authentication & Security
- User registration and login with name, email, and password.
- Password hashing with **bcrypt** (salt rounds = 12).
- JWT-based authentication; users only access their own readings.
- Protected routes on the frontend with automatic token attachment in API headers.

### 2. Blood Glucose Readings Management
- Record readings with **Date**, **Slot**, and **Value (mg/dl)**.
- 4 defined time slots:
  - `Morning (fasting)`
  - `After breakfast`
  - `After lunch`
  - `After dinner`
- **Strict Validation Rules:**
  - Value required: *"Please enter a glucose value."*
  - Value range: Whole number between 40 and 600 mg/dl (*"Value must be between 40 and 600 mg/dl."*)
  - One reading per slot per day: *"You already have an [Slot] reading for this date."*
  - Daily limit: *"You can add only 4 readings per day."*
  - Date validation: *"Date cannot be in the future."*
- Full CRUD: Add, view, edit, and delete readings with confirmation dialogs.

### 3. Comprehensive Reports
- **Daily Report:** Selected date statistics (Highest, Lowest, Average rounded to 1 decimal, Count) and lists each individual reading with its slot.
- **Month-to-Date Report:** From the 1st of the month to the selected date.
- **Previous Month Report:** The entire preceding calendar month.
- **Friendly Empty State:** Clean, helpful message when no readings exist for a period.

### 4. Bonus Features
- **Interactive Charts:** Visual glucose trend lines built with Recharts with clinical target range guides (70–140 mg/dl).
- **Pagination:** Clean pagination controls on the readings list.
- **Docker Compose:** Ready-to-run PostgreSQL container.
- **Responsive UI:** Seamless experience on mobile, tablet, and desktop devices.

---

## 📝 Notes & Assumptions

### Assumptions
1. **Clinical Normal Range:** Visual badges indicate clinical ranges (Low: <70, Normal: 70–140, Elevated: 141–180, High: >180 mg/dl) to provide helpful context for patients.
2. **Date Boundaries:** Dates are evaluated in UTC/standard ISO format to prevent timezone offset discrepancies between client and database.
3. **Editable Fields:** When editing a reading, patients can update any combination of date, slot, and value, while preserving all validation constraints.

### What I'd Improve with More Time
1. **Export to PDF / CSV:** Add a one-click button to export monthly glucose logs for patients to share with their doctors.
2. **Doctor Role (Bonus):** Implement role-based access control (RBAC) where doctors can inspect assigned patients' reports.
3. **Automated Reminders:** Scheduled background job using BullMQ/node-cron reminding patients when fewer than 4 readings are logged before bedtime.
4. **Offline Sync (PWA):** Service worker caching to record readings offline and sync once connected.


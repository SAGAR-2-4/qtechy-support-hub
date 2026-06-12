# QTechy Support Hub

## Project Overview

QTechy Support Hub is a role-based ticket management system designed to streamline customer support operations. The system enables users to create and track support tickets, agents to manage assigned issues, and administrators to oversee the entire support process through a centralized dashboard.

The application follows a modern full-stack architecture using React, Node.js, Express.js, and MongoDB, with secure JWT-based authentication and role-based access control.

---

## Features

### Authentication & Security

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Role-Based Access Control (RBAC)

### User Features

* Create Support Tickets
* View Own Tickets
* Search and Filter Tickets
* Add Comments
* Edit Own Open Tickets
* View Status History

### Agent Features

* View Assigned Tickets
* Add Ticket Comments
* Update Ticket Status
* Track Ticket Progress

### Admin Features

* Dashboard Analytics
* User Management
* Role Management
* Assign Tickets to Agents
* Update Ticket Priority
* Update Ticket Category
* Delete Tickets
* View All Tickets

### Ticket Management

* Create Ticket
* View Ticket Details
* Update Ticket
* Delete Ticket
* Assign Ticket
* Comment System
* Status Tracking
* Search & Filtering

### UI Features

* Responsive Design
* Mobile Sidebar Navigation
* Desktop Sidebar Collapse
* KPI Dashboard Cards
* Modern SaaS Interface
* Poppins Typography

---

## Technology Stack

### Frontend

* React.js
* Redux Toolkit
* React Router DOM
* Axios
* Tailwind CSS
* Lucide React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Express Validator

### Deployment

* Frontend: Netlify
* Backend: Render
* Database: MongoDB Atlas

---

## System Roles

### Admin

* Manage all tickets
* Assign agents
* Manage users
* Update roles
* Update ticket priority/category
* Delete tickets

### Agent

* View assigned tickets
* Add comments
* Update ticket status

### User

* Create tickets
* Track tickets
* Edit own open tickets
* Add comments

---

## Installation

### Clone Repository

```bash
git clone <https://github.com/SAGAR-2-4/qtechy-support-hub.git>
```

### Backend Setup

```bash
cd Backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

-----------------------------------

## login credential for testing
Admin: admin@test.com
agent: agent@test.com
user : user1@test.com

------------------------------------

## Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=refer document
JWT_SECRET=qtechy_support_hub_2026_super_secure_random_secret_9xK72pLm
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Deployment Links

Frontend:
<https://tech-supporthub.netlify.app/>

Backend:
<https://qtechy-support-hub.onrender.com>

---


## Project Structure

Backend

* Controllers
* Services
* Routes
* Models
* Middleware
* Validators

Frontend

* Pages
* Components
* Layouts
* Redux Slices
* API Layer
* Routes

---

## Future Enhancements

* Email Notifications
* File Attachments
* SLA Management
* Ticket Escalation Workflow
* Advanced Reporting
* Real-Time Notifications
* Dashboard Analytics Enhancements

---

## Developed By
Sagar

QTechy Support Hub – Role-Based Ticket Management System

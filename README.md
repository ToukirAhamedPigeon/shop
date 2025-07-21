# Shop

**Shop** is a real-time, AI-powered eCommerce web application featuring a React + Vite frontend and a .NET Core Web API backend. This project uses PostgreSQL as the database and is designed for scalability and modern web performance.

---

## Project Structure

shop/
├── client/        # React + Vite frontend application
├── server/        # .NET Core Web API backend
├── docs/          # Documentation, specs, etc.
└── db/            # Database schema and migration scripts

---

## Tech Stack

- Frontend: React, Vite, JavaScript/TypeScript  
- Backend: .NET Core Web API (C#)  
- Database: PostgreSQL  
- Containerization: Docker  
- Deployment: Vercel (frontend), AWS EC2 (backend)  
- CI/CD: GitHub Actions (planned)  

---

## Getting Started

### Prerequisites

- Node.js (v16+)  
- .NET SDK (v6, 7, or 8)  
- Docker  
- PostgreSQL (local or remote instance)  

### Running Locally

#### Frontend

```bash
cd client
npm install
npm run dev

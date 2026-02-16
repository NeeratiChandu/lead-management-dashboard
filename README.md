Lead Management Dashboard
A full-stack mini CRM-style dashboard for managing leads, built with React, Node.js, Express, and MongoDB. Features server-side search, filters, sorting, pagination, lead details view, and analytics metrics. Deployed using free hosting providers (Vercel for frontend, Render for backend).

Features
Frontend: Mobile-responsive React UI with login screen, leads table/list, search/filter/sort/pagination, lead details modal, and analytics dashboard (total leads, converted leads, leads by stage chart).
Backend: RESTful APIs for fetching leads with advanced querying, JWT-based authentication, and MongoDB integration.
Database: MongoDB Atlas (free tier) with 500+ seeded dummy leads.
Deployment: Free hosting on Vercel (frontend) and Render (backend).
Tech Stack
Frontend: React, Vite, Tailwind CSS, Axios, Recharts (for charts).
Backend: Node.js, Express, Mongoose, JWT, bcryptjs, CORS.
Database: MongoDB Atlas.
Hosting: Vercel (frontend), Render (backend).
Prerequisites
Node.js (v18+ recommended).
npm or yarn.
Git.
MongoDB Atlas account (free tier).
GitHub account for deployment.
Installation
Clone the repository:

bash

Copy code
git clone https://github.com/NeeratiChandu/lead-management-dashboard.git
cd lead-management-dashboard
Set up the backend:

bash

Copy code
cd backend
npm install
Set up the frontend:

bash

Copy code
cd ../frontend
npm install
Environment Variables
Create a .env file in the backend/ folder for local development. For deployment, add these in Render/Vercel dashboards.

Backend (Render)
MONGO_URI: Your MongoDB Atlas connection string (e.g., mongodb+srv://username:password@cluster.mongodb.net/lead-management?retryWrites=true&w=majority). URL-encode special characters in the password (e.g., @ → %40).
JWT_SECRET: A secure random string for JWT authentication (e.g., your-super-secret-jwt-key-here).
PORT: 5000 (local) or 10000 (Render).
Frontend (Vercel)
VITE_API_BASE: Backend API URL (local: http://localhost:5000/api; deployed: https://lead-management-dashboard-1-yar3.onrender.com/api).
Example .env for backend:


Copy code
MONGO_URI=mongodb+srv://pinspire:Chinnari%4012@cluster1.ynbip47.mongodb.net/lead-management?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here
PORT=5000
Seeding Database
To populate MongoDB with 500 dummy leads:

Ensure your .env is set up with a valid MONGO_URI.
Run the seeder:
bash

Copy code
cd backend
npm run seed
This connects to MongoDB Atlas and inserts leads with fields like name, email, phone, company, stage, and source.
Output: "MongoDB connected" followed by "500 leads seeded".
For deployment, seed locally first or run via Render logs if needed.

Running Locally
Start the backend:

bash

Copy code
cd backend
npm run dev
Server runs on http://localhost:5000.
APIs available at /api/leads.
Start the frontend:

bash

Copy code
cd frontend
npm run dev
App runs on http://localhost:5173.
Set VITE_API_BASE=http://localhost:5000/api in frontend .env.
Open http://localhost:5173, login, and test features.

Deployment
Backend (Render)
Push backend/ to GitHub.
Create a new Web Service on Render.
Connect GitHub repo, set Root Directory to backend, Build Command to npm install, Start Command to npm start.
Add environment variables (as above).
Deploy. URL: https://lead-management-dashboard-1-yar3.onrender.com.
Frontend (Vercel)
Push frontend/ to GitHub.
Create a new project on Vercel.
Import GitHub repo, set Root Directory to frontend, Build Command to npm run build.
Add environment variable VITE_API_BASE=https://lead-management-dashboard-1-yar3.onrender.com/api.
Deploy. URL: https://lead-management-frontend.vercel.app.
Demo
Deployed Frontend: https://lead-management-frontend.vercel.app
Deployed Backend: https://lead-management-dashboard-1-yar3.onrender.com
Credentials: Username: admin, Password: password.
Test features: Login, view/search/filter/sort/paginate leads, open lead details, check analytics chart.
API Endpoints
POST /api/login: Authenticate (body: {username, password}) → Returns JWT token.
GET /api/leads: Fetch leads (query params: search, stage, source, sort, page, limit). Requires JWT.
GET /api/leads/:id: Fetch single lead by ID. Requires JWT.
Use Postman or curl with Authorization: Bearer <token> header.

Troubleshooting
MongoDB Errors: Ensure URI is correct, IP whitelisted in Atlas, and TLS options added if SSL issues.
Deployment Failures: Check logs in Render/Vercel; verify env vars and root directories.
Frontend Not Loading Data: Confirm VITE_API_BASE matches backend URL.
For more, see Render/Vercel docs or open an issue.

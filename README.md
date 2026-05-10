# Cardio-Diabetic Patient Record & Research Data Management System

Production-ready MERN modular monolith for cardio-diabetic hospital workflows:

`Login -> Dashboard -> Register Patient -> Create Visit -> Add Clinical Record -> Add Lab Result -> Add Diagnosis/Treatment -> Set Follow-up -> Export De-identified Research Data`

## Project Overview

This system is designed for hospital operations and research support with strict role-based access, audit logging, de-identified research exports, and sustainable architecture for long-term maintenance.

Core capabilities:
- Authentication + JWT + RBAC (`SUPER_ADMIN`, `ADMIN`, `DOCTOR`, `STAFF`, `RESEARCH_ADMIN`)
- Patient registration and lifecycle (active/archive/hard-delete by Super Admin only)
- Visit management
- Clinical record capture with BMI/BP auto-calculation
- Lab result capture with lab report upload (PDF/JPG/JPEG/PNG, max 5MB)
- Diagnosis + medication + follow-up linkage
- Dashboard metrics and chart feeds
- Reports module
- De-identified research dataset and Excel/CSV export (consented records only)
- Audit logs for important actions

## Tech Stack

Backend:
- Node.js, Express.js, MongoDB, Mongoose
- JWT, bcryptjs
- Zod validation
- Multer, Helmet, CORS, Morgan, Compression, Cookie Parser, Rate Limiter

Frontend:
- React + Vite
- Tailwind CSS
- React Router
- React Hook Form + Zod
- Axios
- Recharts
- Sonner toasts
- XLSX export handling

## Architecture

### Backend (Modular Monolith)
- Feature-based modules in `backend/src/modules/*`
- Controller -> Service -> Repository pattern
- Centralized error handling (`ApiError`, `errorMiddleware`)
- Consistent response format (`ApiResponse`)
- Centralized validation middleware (`validate`)
- Reusable auth/role/permission/audit/upload middlewares

### Frontend (Feature-based)
- Feature folders in `frontend/src/features/*`
- Reusable shared UI/layout/hooks/utils
- Central Axios client with auth interceptor
- Protected routes + role guards
- Reusable form/table components

## Folder Structure

- `backend/` Express API, models, services, repos, middlewares, seeds, tests
- `frontend/` React UI with feature-based architecture
- `backend/uploads/lab-reports/` uploaded report files

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Backend Scripts

```json
{
  "dev": "nodemon src/server.js",
  "start": "node src/server.js",
  "seed": "node src/seed/seedAdmin.js",
  "seed:settings": "node src/seed/seedSettings.js",
  "test": "cross-env NODE_ENV=test jest --runInBand"
}
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
npm run build
```

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
NODE_ENV=development
MONGO_SOURCE=local
MONGO_URI_LOCAL=mongodb://127.0.0.1:27017/cardio-diabetic
MONGO_URI_ATLAS=mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_URL>/cardio-diabetic?retryWrites=true&w=majority
JWT_SECRET=replace_with_strong_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
UPLOAD_DIR=uploads
```

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

## MongoDB Setup

Use either:
- Local MongoDB (`mongodb://127.0.0.1:27017/cardio-diabetic`)
- MongoDB Atlas connection string in `MONGO_URI_ATLAS`

Switch source with:

```bash
MONGO_SOURCE=local npm run dev
# or
MONGO_SOURCE=atlas npm run dev
```

## Seed Data

From `backend/`:

```bash
npm run seed
npm run seed:settings
npm run seed:patients
npm run seed:reset-admin
```

Seeds include:
- Default Super Admin
- Default settings (departments, visit types, risk levels, follow-up statuses, etc.)
- Dummy patient records for quick testing

`seed:reset-admin` will force-reset the Super Admin credentials to:
- Email: `admin@cardiodiabetic.local`
- Password: `Admin@12345`

## Role Credentials

Default seeded credential:
- Email: `admin@cardiodiabetic.local`
- Password: `Admin@12345`
- Role: `SUPER_ADMIN`

## API Overview

Base URL: `http://localhost:5000/api/v1`

Main groups:
- `/auth`
- `/users`
- `/patients`
- `/visits`
- `/clinical-records`
- `/lab-results`
- `/diagnoses`
- `/medications`
- `/follow-ups`
- `/dashboard`
- `/research`
- `/reports`
- `/settings`
- `/audit-logs`

All responses follow:

Success:
```json
{
  "success": true,
  "message": "...",
  "data": {},
  "meta": {}
}
```

Error:
```json
{
  "success": false,
  "message": "...",
  "errors": []
}
```

## Research Data Security

Research export is de-identified and consent-gated:
- Export only where `researchConsent = true`
- Never includes: full name, phone, full address, emergency contacts
- Export allowed only to `SUPER_ADMIN`, `ADMIN`, `RESEARCH_ADMIN`

`RESEARCH_ADMIN` routes are isolated to research-safe datasets and exports.

## Deployment Guide

1. Provision MongoDB (Atlas or managed instance)
2. Set backend env variables
3. Deploy backend (Node runtime)
4. Set frontend `VITE_API_BASE_URL` to deployed backend
5. Build frontend (`npm run build`) and deploy static assets
6. Configure CORS `CLIENT_URL` to deployed frontend URL
7. Run seed scripts once in target environment

## Security Notes

Implemented:
- JWT authentication
- Password hashing with bcrypt
- Role and permission middleware
- Rate limiting on login
- Helmet + CORS whitelist
- Centralized validation and error handling
- File type and size validation for uploads
- Audit logging for sensitive actions
- No password exposure in API responses

## Testing Notes

- Backend test files exist in `backend/src/tests/*`.
- In restricted sandboxes where local port binding is blocked, `mongodb-memory-server` may fail with `EPERM`.
- Frontend production build passes (`npm run build`).

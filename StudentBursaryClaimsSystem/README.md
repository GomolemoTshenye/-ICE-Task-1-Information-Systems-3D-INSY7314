# Student Bursary Claims Management System

## Student Details

- **Name:** Gomolemo Tshenye
- **Student Number:** ST10341577


A full-stack MERN application for monthly university bursary claims.

## What the application demonstrates

- React user interface with Home, Submit Claim, and View Claims pages.
- Node.js + Express REST API with route/controller/service separation.
- MongoDB database accessed with Mongoose.
- Student Number, names, and Hours Worked validation on both client and API layers.
- Server-generated Claim ID, hourly rate, total claim amount, date, and status.
- Fixed rate of **R200.00/hour**.
- New claims default to **Pending**.
- Student searches return only claims from the **previous 12 months**, filtered by the backend.
- Only **Pending** claims may be cancelled, enforced by the backend.
- Clear 200/201/400/404/409/500 JSON responses.
- Basic security foundations: Helmet headers, CORS configuration, JSON body size limit, and API rate limiting.

## Project structure

```text
StudentBursaryClaimsSystem/
├─ backend/
│  └─ src/
│     ├─ config/
│     ├─ controllers/
│     ├─ middleware/
│     ├─ models/
│     ├─ routes/
│     ├─ services/
│     ├─ app.js
│     └─ server.js
└─ frontend/
   └─ src/
      ├─ components/
      ├─ pages/
      └─ services/
```

## Requirements

Install these first:

1. Node.js 20+ (LTS recommended)
2. MongoDB Community Server, **or** a MongoDB Atlas connection string

## Fast setup on Windows

From the project root in PowerShell:

```powershell
.\setup.ps1
```

Then use two PowerShell windows:

```powershell
.\run-backend.ps1
```

and:

```powershell
.\run-frontend.ps1
```

## Setup - backend

Open Terminal 1 in the project folder:

```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run dev
```

Default API: `http://localhost:5000`

The `.env` file uses local MongoDB by default:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/student_bursary_claims
```

If your lecturer provides a different maximum number of monthly hours, change:

```env
MAX_MONTHLY_HOURS=160
```

## Setup - frontend

Open Terminal 2:

```powershell
cd frontend
Copy-Item .env.example .env
npm install
npm run dev
```

Then open the URL Vite shows, normally:

`http://localhost:5173`

## Validation approach

This solution uses **express-validator** at the API request layer and **Mongoose schema validation** at the database/model layer. The React form also gives immediate user feedback. Important generated fields are explicitly rejected if a client tries to send them.

The server owns these values:

- `hourlyRate`
- `totalClaimAmount`
- `dateSubmitted`
- `status`
- MongoDB `_id` (Claim ID)

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | API health check |
| POST | `/api/claims` | Submit a claim |
| GET | `/api/claims/:claimId` | Get one claim |
| GET | `/api/claims/student/:studentNumber` | Get a student's previous-12-month claims |
| PATCH | `/api/claims/:claimId/cancel` | Cancel a Pending claim |

### Example create request

```json
{
  "studentNumber": "ST2026001",
  "firstName": "Thando",
  "surname": "Mokoena",
  "hoursWorked": 12.5
}
```

The expected total is R2,500.00 because 12.5 × R200.00 = R2,500.00.

## Recommended demonstration sequence

1. Show the Home page.
2. Open Submit Claim.
3. Enter `ST2026001`, a name and surname, and `12.5` hours.
4. Show the displayed fixed rate and calculated R2,500.00 total.
5. Submit and capture the successful Claim ID message.
6. Open View Claims and search `ST2026001`.
7. Capture the results table with the Pending badge.
8. Click Cancel and confirm it changes to Cancelled.
9. Try to cancel the same claim again using the API (optional evidence) to demonstrate the backend business rule.

## Important submission note

Do not commit real `.env` secrets or a MongoDB Atlas password. Commit `.env.example` only.

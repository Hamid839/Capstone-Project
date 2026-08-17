# HisabDo Web (Capstone Project)

A modern MERN/Next.js recreation of the HisabDo khata/ledger mobile app experience — company website, responsive web app, and admin dashboard.

**Internship track:** MERN / Next.js
**Duration:** Day 8 → Day 60

## 📌 Day 8 Deliverable

See [`docs/Day8-Analysis-Architecture.md`](./docs/Day8-Analysis-Architecture.md) for:
- Product analysis of https://hisabdo.app/
- Complete user journey & flow diagram
- Website page list & web app module list
- Proposed Next.js folder structure
- Technology stack
- UI/UX improvement suggestions
- Performance & technical recommendations

## Tech Stack (proposed)

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Zustand · React Hook Form + Zod · Express · MongoDB/Mongoose · JWT Auth · Recharts · node-cron

## Getting Started

See [`SETUP.md`](./SETUP.md) for full system requirements and VS Code extension setup. Quick start:

```bash
npm install
copy .env.example .env.local   # Windows (or: cp .env.example .env.local on Mac/Linux)
npm run dev        # Next.js frontend on http://localhost:3000
npm run server:dev # Express API (server/) on its configured port
```

## Project Structure

See the folder structure section in `docs/Day8-Analysis-Architecture.md`. High level:

- `app/` — Next.js routes: marketing site, auth, dashboard, admin, API routes
- `components/` — shared UI, layout, dashboard, chart, and form components
- `lib/` — client-side utilities, hooks, validators, DB helpers
- `server/` — Express + MongoDB backend (models, controllers, routes, jobs)
- `docs/` — architecture notes and daily capstone documentation

## Status

🚧 Foundational scaffold only — no features implemented yet. This is the Day 8 planning/architecture milestone. Feature development begins in subsequent daily milestones.

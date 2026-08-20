# Capstone Project

A modern MERN/Next.js recreation of the HisabDo khata/ledger mobile app experience — company website, responsive web app, and admin dashboard. Built as a single continuous project across the internship (Day 8 → Day 60), not separate per-day folders.

**Internship track:** MERN / Next.js
**Duration:** Day 8 → Day 60
**Progress log:** [`docs/PROGRESS.md`](./docs/PROGRESS.md) — what was done on each day, updated as the project continues

## 📌 Architecture & Analysis (Day 8)

See [`docs/Day8-Analysis-Architecture.md`](./docs/Day8-Analysis-Architecture.md) for:
- Product analysis of https://hisabdo.app/
- Complete user journey & flow diagram
- Website page list & web app module list
- Proposed Next.js folder structure
- Technology stack
- UI/UX improvement suggestions
- Performance & technical recommendations

## 📌 Current Implementation Status (through Day 9)

- Working Next.js project with a real design system: a ledger-paper palette (ink navy, brass gold accent, credit/debit colors), serif display type + sans body type, and a recurring "ledger row" motif — grounded in the actual subject (a khata/ledger book) rather than a generic template.
- **Layout components:** `components/layout/Navbar.tsx` (responsive, with mobile hamburger menu), `components/layout/Footer.tsx`, `components/layout/Sidebar.tsx` (dashboard navigation, collapsible on mobile), `components/layout/DashboardTopbar.tsx`.
- **Two route-group layouts wired up:** `app/(marketing)/layout.tsx` (Navbar + Footer around all public pages) and `app/(dashboard)/layout.tsx` (Sidebar + Topbar around the authenticated app).
- **Two fully implemented pages:**
  - `/` (Home) — hero with a live-looking ledger preview, feature strip, CTA band.
  - `/features` — grouped feature breakdown (Recording, Managing customers, Reporting, Peace of mind), based on the Day 8 product analysis.
  - Bonus: `/dashboard` — a working example of the sidebar layout with sample stat cards and a recent-transactions ledger.
- Fully responsive: single-column/stacked on mobile, two-column hero and grid layouts from `sm:`/`md:` breakpoints up, sidebar collapses into a drawer under `md`.

All other routes from the folder scaffold still render as lightweight placeholders and will be filled in on upcoming daily milestones — see `docs/PROGRESS.md` for what's next.

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

🚧 Through Day 9: core layout (Navbar/Sidebar/Footer) and two marketing pages implemented and responsive. Auth, data fetching, and remaining pages are upcoming milestones — see `docs/PROGRESS.md` for the day-by-day log instead of separate folders.

## Working Convention

This is **one project, one repo, continuous history**. New internship days:
- Add commits to this same repo (commit messages prefixed `Day N: ...`)
- Update `docs/PROGRESS.md` with what changed
- Never create a new top-level `day-N` folder or a separate repo

## 📌 Current Implementation Status (through Day 10)

- Working Next.js project with a real design system: a ledger-paper palette (ink navy, brass gold accent, credit/debit colors), serif display type + sans body type, and a recurring "ledger row" motif — grounded in the actual subject (a khata/ledger book) rather than a generic template.
- **Layout components:** `components/layout/Navbar.tsx` (responsive, with mobile hamburger menu), `components/layout/Footer.tsx`, `components/layout/Sidebar.tsx` (dashboard navigation, collapsible on mobile, active-state aware of nested routes), `components/layout/DashboardTopbar.tsx`.
- **Reusable UI primitives** (`components/ui/`): `Button`, `Card`, `Input`/`Textarea`, generic typed `Table`, `Badge`, `Breadcrumbs`.
- **Customers module** — the first functional module, based on the mobile app's core ledger feature:
  - `/customers` — searchable list, inline "Add customer" form, per-row balance badges
  - `/customers/[id]` — full customer detail + transaction history
  - Form validated end-to-end with **react-hook-form + zod** (see `lib/validators/customer.schema.ts`)
  - Data is currently in-memory (`lib/mock/customers.ts`) — real API wiring is a future milestone
- **Dashboard** (`/dashboard`) — stat cards + recent transactions, built from the same reusable components as the Customers module (no duplicated markup).
- **Two marketing pages:** Home (`/`) and Features (`/features`).
- Fully responsive throughout: verified at mobile/tablet/desktop breakpoints.

Full day-by-day detail lives in [`docs/PROGRESS.md`](./docs/PROGRESS.md) and [`docs/Day10-Implementation.md`](./docs/Day10-Implementation.md). All other routes from the folder scaffold still render as lightweight placeholders.

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

🚧 Through Day 10: core layout, design system, Dashboard, and the Customers module (list + detail, validated form, reusable components) are implemented and responsive. Auth and real API/database wiring are upcoming milestones — see `docs/PROGRESS.md` for the day-by-day log instead of separate folders.

## Working Convention

This is **one project, one repo, continuous history**. New internship days:
- Add commits to this same repo (commit messages prefixed `Day N: ...`)
- Update `docs/PROGRESS.md` with what changed
- Never create a new top-level `day-N` folder or a separate repo

## Day 11 & Day 12 Progress

### Modules Completed
1. **Customers** (Day 10) – List, Add, Detail
2. **Transactions** (Day 11) – Full CRUD (List, Add, Edit, Delete) + Validation
3. **Ledger** (Day 12) – Customer-wise ledger view with running balance and history

### Features
- Form validation using Zod + React Hook Form
- Loading / Empty / Error states
- Responsive design (mobile + desktop)
- Reusable UI components
- Mock data layer ready to be replaced by real API later
- Structure prepared for future authentication protection

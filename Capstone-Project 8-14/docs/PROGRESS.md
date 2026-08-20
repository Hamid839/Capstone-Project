# Capstone Progress Log

This file is the running record of what changed on each internship day. There is
**one project, one repo, one continuous history** — new days add commits and update
this log, they never create a new top-level folder.

---

## Day 8 — Planning & Architecture
- Analyzed the HisabDo product (website + mobile app)
- Produced the full analysis doc: [`docs/Day8-Analysis-Architecture.md`](./docs/Day8-Analysis-Architecture.md)
- Defined website page list, web app module list, user flow diagram
- Scaffolded the Next.js App Router folder structure (`app/`, `components/`, `lib/`, `server/`)
- Chose the technology stack (Next.js, TypeScript, Tailwind, Express, MongoDB/Mongoose, JWT)

## Day 9 — Project Setup & Initial UI
- Verified `npm install` + `next build` run cleanly end to end
- Built a ledger-inspired design system (ink/paper/brass/credit/debit palette, serif+sans type, recurring "ledger row" motif) in `tailwind.config.js` and `app/globals.css`
- Implemented `Navbar`, `Footer`, `Sidebar`, `DashboardTopbar` in `components/layout/`
- Wired `app/(marketing)/layout.tsx` (Navbar + Footer) and `app/(dashboard)/layout.tsx` (Sidebar + Topbar)
- Implemented two full pages: Home (`/`) and Features (`/features`), plus a bonus Dashboard (`/dashboard`) demonstrating the sidebar
- Confirmed fully responsive behavior across mobile/tablet/desktop breakpoints

## Day 10 — Core Functionality & Customers Module
- Built reusable UI primitives in `components/ui/`: `Button`, `Card`, `Input`/`Textarea`, `Table` (generic/typed), `Badge`, `Breadcrumbs`
- Implemented the **Customers module** — `/customers` (list, search, add-customer form) and `/customers/[id]` (detail + transaction history)
- Added `lib/validators/customer.schema.ts` (zod) + `components/forms/CustomerForm.tsx` (react-hook-form) for real inline form validation
- Added `lib/types.ts` and `lib/mock/customers.ts` as a temporary in-memory data layer (no backend wired yet)
- Refactored Dashboard to use new `StatCard`/`RecentTransactions` components instead of Day 9's inline markup
- Improved Sidebar active-link detection to handle nested routes (e.g. `/customers/[id]`)
- Full write-up: [`docs/Day10-Implementation.md`](./Day10-Implementation.md)

## Day 11 — (add here when started)
- ...

<!--
Template for future days:

## Day N — <short title>
- What was added
- What was changed
- Any new dependencies
- Anything that still needs follow-up
-->

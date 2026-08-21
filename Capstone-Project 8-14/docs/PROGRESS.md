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

## Day 11 — Transactions Module
- Implemented the **Transactions module**: list, add, edit, and delete — full CRUD, unlike Customers' add-only scope on Day 10
- Added `lib/validators/transaction.schema.ts` (zod) + `components/forms/TransactionForm.tsx`
- Connected to the Dashboard (`getDashboardStats()`, `RecentTransactions`)
- Loading / empty / error states added

## Day 12 — Ledger Module
- Implemented the **Ledger module** (`app/(dashboard)/ledger/page.tsx`): customer selector, running balance, full transaction history per customer
- Ledger is an intentional read-only derived view composed from Customer + Transaction data — see the "Note on the Ledger module" in the README
- Improved navigation between all three modules (Customers, Transactions, Ledger)
- Confirmed responsive behavior across the new pages

## Day 13 — Authentication (Login, Register, Forgot Password)
- Built `lib/auth/AuthContext.tsx` — mock, localStorage-based auth (`login`, `register`, `logout`, `updateProfile`)
- Implemented `/login`, `/register`, `/forgot-password` pages with zod + react-hook-form validation
- Protected the Dashboard route group: `app/(dashboard)/layout.tsx` redirects unauthenticated users to `/login`
- Demo account: `hamid@hisabdo.com` / `123456`

## Day 14 — Profile, Settings, and Auth Polish
- Added `/profile` and `/settings` pages
- Wired Logout into the Sidebar, connected to `AuthContext`
- Fixed UI/UX issues found during testing; confirmed responsiveness across the full app
- See the README's "Note on authentication" for the documented limitations of the current mock auth approach

## Day 15 — (add here when started)
- ...

<!--
Template for future days:

## Day N — <short title>
- What was added
- What was changed
- Any new dependencies
- Anything that still needs follow-up
-->

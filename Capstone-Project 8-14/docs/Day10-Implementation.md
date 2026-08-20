# Day 10 — Implementation Notes

## What was built

**Functional module: Customers** (chosen because the Day 8 analysis identified
customer-wise ledger tracking as the core of the HisabDo mobile app — this is
the one module the whole rest of the app hangs off of).

- `/customers` — list of customers with live search, an inline "Add customer"
  form, and each row's running balance shown as a credit/debit badge.
- `/customers/[id]` — single customer's detail view: contact info, notes, and
  full transaction history for that customer.
- Data currently comes from `lib/mock/customers.ts` (in-memory). Anything
  added through the form persists only for the current browser session — it
  is **not** yet saved to a database. Wiring this up to the real
  Express/MongoDB API in `server/` is planned for an upcoming milestone
  (tracked in `docs/PROGRESS.md`).

## Reusable components introduced (`components/ui/`)

| Component | Used by |
|---|---|
| `Button` | Customers page, CustomerForm, Navbar, Footer CTAs |
| `Card` / `CardHeader` / `CardTitle` / `CardContent` | Dashboard stat cards, Customers table wrapper, customer detail |
| `Input` / `Textarea` | CustomerForm |
| `Table` (generic, typed) | Customers list |
| `Badge` | Balance indicators on customer rows and detail page |
| `Breadcrumbs` | Customer detail page navigation |

`StatCard` and `RecentTransactions` (in `components/dashboard/`) were also
implemented on top of `Card`, replacing the Day 9 inline markup, so the
Dashboard and Customers module now share the same building blocks instead of
duplicating styles.

## Form validation

`components/forms/CustomerForm.tsx` uses **react-hook-form** +
**zod** (`lib/validators/customer.schema.ts`) via `@hookform/resolvers`.
Validated rules:
- Name: required, 2–80 characters
- Phone: required, 7+ characters, numbers/spaces/`+`/`-` only
- Opening balance: required, must be a valid number (coerced from the text input)
- Notes: optional, capped at 200 characters

Errors surface inline under each field via the shared `Input`/`Textarea`
components' `error` prop — no native browser validation popups, consistent
styling with the rest of the app.

## Responsiveness

- Customers table degrades to a 2-column view on mobile (Notes column hides
  under `sm:`), full 3-column from `sm:` up.
- The add-customer form stacks full-width on mobile; action buttons reverse
  to stack above `sm:` for easier thumb reach.
- Dashboard stat cards: 1 column on mobile → 3 columns from `sm:` up.
- Verified against the same breakpoints used since Day 9 (mobile / tablet /
  desktop via browser dev tools).

## Verified before delivery

Ran an actual `npm install` + `npx next build` in a clean environment — all
32 routes compile with no errors. Also unit-checked the zod schema directly
(valid input passes, invalid input is rejected with the expected messages)
before wiring it into the form.

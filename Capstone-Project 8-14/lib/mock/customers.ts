import type { Customer, Transaction } from "@/lib/types";

// Temporary in-memory data. This will be replaced by real API calls once the
// Express + MongoDB backend (server/) is wired up in a later milestone.
// See docs/PROGRESS.md — Day 10 entry.
//
// Note on `openingBalance`: for the 5 seed customers below, it's 0 because
// their balance is fully represented by their one seeded transaction. For any
// customer added later via the "Add customer" form (no transactions yet),
// openingBalance IS their balance until real transactions get recorded.

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "c1",
    name: "Ahmed Traders",
    phone: "0300-1234567",
    openingBalance: 0,
    notes: "Regular cloth supplier, pays monthly.",
    createdAt: "2026-06-01",
  },
  {
    id: "c2",
    name: "Bilal Kirana Store",
    phone: "0321-9876543",
    openingBalance: 0,
    notes: "Advance paid for next order.",
    createdAt: "2026-06-04",
  },
  {
    id: "c3",
    name: "Sana Beauty Parlour",
    phone: "0333-5551234",
    openingBalance: 0,
    createdAt: "2026-06-10",
  },
  {
    id: "c4",
    name: "Waseem Hardware",
    phone: "0345-1112223",
    openingBalance: 0,
    notes: "Settles every 15 days.",
    createdAt: "2026-06-12",
  },
  {
    id: "c5",
    name: "Imran Electronics",
    phone: "0312-4445556",
    openingBalance: 0,
    createdAt: "2026-06-15",
  },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "t1", customerId: "c1", note: "Cloth — 3 bolts", amount: 4500, date: "2026-06-01" },
  { id: "t2", customerId: "c2", note: "Payment received", amount: -2000, date: "2026-06-04" },
  { id: "t3", customerId: "c3", note: "Supplies — monthly", amount: 1250, date: "2026-06-10" },
  { id: "t4", customerId: "c4", note: "Payment received", amount: -6000, date: "2026-06-12" },
  { id: "t5", customerId: "c5", note: "Repair parts", amount: 3800, date: "2026-06-15" },
];

/** Current balance = opening balance + every recorded transaction since. */
export function getCustomerBalance(customerId: string): number {
  const customer = MOCK_CUSTOMERS.find((c) => c.id === customerId);
  const opening = customer?.openingBalance ?? 0;
  const txSum = MOCK_TRANSACTIONS.filter((t) => t.customerId === customerId).reduce(
    (sum, t) => sum + t.amount,
    0
  );
  return opening + txSum;
}

interface NewCustomerInput {
  name: string;
  phone?: string;
  openingBalance: number;
  notes?: string;
}

/** Adds a customer to the shared in-memory list. Mutates MOCK_CUSTOMERS in place
 *  so every page reading it (list, detail, dashboard) sees the new customer
 *  immediately, without needing a real backend yet. */
export function addCustomer(input: NewCustomerInput): Customer {
  const newCustomer: Customer = {
    id: `c${Date.now()}`,
    name: input.name,
    phone: input.phone,
    openingBalance: input.openingBalance,
    notes: input.notes,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  MOCK_CUSTOMERS.unshift(newCustomer);
  return newCustomer;
}

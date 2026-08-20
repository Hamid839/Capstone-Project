import type { Customer, Transaction } from "@/lib/types";

export let MOCK_CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "Ahmed Traders",
    phone: "0300-1234567",
    notes: "Regular wholesale customer",
    openingBalance: 15000,
    createdAt: "2026-08-01T10:00:00.000Z",
  },
  {
    id: "2",
    name: "Fatima Boutique",
    phone: "0321-9876543",
    notes: "We owe her for last order",
    openingBalance: -3200,
    createdAt: "2026-08-02T11:00:00.000Z",
  },
  {
    id: "3",
    name: "Karachi Electronics",
    phone: "0333-5556677",
    notes: "",
    openingBalance: 8750,
    createdAt: "2026-08-03T09:30:00.000Z",
  },
];

export let MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "t1",
    customerId: "1",
    note: "Payment received for invoice #102",
    amount: 5000,
    date: "2026-08-18",
    type: "credit",
    createdAt: "2026-08-18T14:00:00.000Z",
  },
  {
    id: "t2",
    customerId: "2",
    note: "Goods delivered - order #55",
    amount: -1800,
    date: "2026-08-17",
    type: "debit",
    createdAt: "2026-08-17T11:20:00.000Z",
  },
  {
    id: "t3",
    customerId: "3",
    note: "Partial payment",
    amount: 2500,
    date: "2026-08-16",
    type: "credit",
    createdAt: "2026-08-16T16:45:00.000Z",
  },
  {
    id: "t4",
    customerId: "1",
    note: "New order advance",
    amount: -3000,
    date: "2026-08-15",
    type: "debit",
    createdAt: "2026-08-15T10:10:00.000Z",
  },
];

// ---------- Customer helpers ----------
export function getCustomers() {
  return [...MOCK_CUSTOMERS];
}

export function getCustomerById(id: string) {
  return MOCK_CUSTOMERS.find((c) => c.id === id) ?? null;
}

export function addCustomer(data: {
  name: string;
  phone?: string;
  openingBalance: number;
  notes?: string;
}) {
  const newCustomer: Customer = {
    id: String(Date.now()),
    name: data.name,
    phone: data.phone,
    notes: data.notes,
    openingBalance: data.openingBalance,
    createdAt: new Date().toISOString(),
  };
  MOCK_CUSTOMERS = [newCustomer, ...MOCK_CUSTOMERS];
  return newCustomer;
}

// ---------- Transaction helpers ----------
export function getTransactions() {
  return [...MOCK_TRANSACTIONS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getTransactionById(id: string) {
  return MOCK_TRANSACTIONS.find((t) => t.id === id) ?? null;
}

export function getTransactionsByCustomer(customerId: string) {
  return MOCK_TRANSACTIONS.filter((t) => t.customerId === customerId).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function addTransaction(data: {
  customerId: string;
  note: string;
  amount: number;
  date: string;
  type: "credit" | "debit";
}) {
  const newTx: Transaction = {
    id: "t" + Date.now(),
    customerId: data.customerId,
    note: data.note,
    amount: data.type === "credit" ? Math.abs(data.amount) : -Math.abs(data.amount),
    date: data.date,
    type: data.type,
    createdAt: new Date().toISOString(),
  };
  MOCK_TRANSACTIONS = [newTx, ...MOCK_TRANSACTIONS];
  return newTx;
}

export function updateTransaction(
  id: string,
  data: {
    customerId: string;
    note: string;
    amount: number;
    date: string;
    type: "credit" | "debit";
  }
) {
  const index = MOCK_TRANSACTIONS.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const updated: Transaction = {
    ...MOCK_TRANSACTIONS[index],
    customerId: data.customerId,
    note: data.note,
    amount: data.type === "credit" ? Math.abs(data.amount) : -Math.abs(data.amount),
    date: data.date,
    type: data.type,
  };

  MOCK_TRANSACTIONS[index] = updated;
  return updated;
}

export function deleteTransaction(id: string) {
  const before = MOCK_TRANSACTIONS.length;
  MOCK_TRANSACTIONS = MOCK_TRANSACTIONS.filter((t) => t.id !== id);
  return MOCK_TRANSACTIONS.length < before;
}

// ---------- Balance helpers ----------
export function getCustomerBalance(customerId: string): number {
  const customer = MOCK_CUSTOMERS.find((c) => c.id === customerId);
  if (!customer) return 0;

  const txTotal = MOCK_TRANSACTIONS
    .filter((t) => t.customerId === customerId)
    .reduce((sum, t) => sum + t.amount, 0);

  return customer.openingBalance + txTotal;
}

export function getDashboardStats() {
  const customers = getCustomers();
  const balances = customers.map((c) => getCustomerBalance(c.id));

  const totalReceivable = balances
    .filter((b) => b > 0)
    .reduce((sum, b) => sum + b, 0);
  const totalPayable = Math.abs(
    balances.filter((b) => b < 0).reduce((sum, b) => sum + b, 0)
  );

  return {
    totalCustomers: customers.length,
    totalReceivable,
    totalPayable,
    netBalance: totalReceivable - totalPayable,
    totalTransactions: MOCK_TRANSACTIONS.length,
  };
}
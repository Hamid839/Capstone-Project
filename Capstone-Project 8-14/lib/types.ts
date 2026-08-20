export type TransactionTone = "credit" | "debit";

export interface Transaction {
  id: string;
  customerId: string;
  note: string;
  amount: number; // positive = credit (they owe you more), negative = debit (they paid)
  date: string; // ISO date
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  openingBalance: number;
  notes?: string;
  createdAt: string; // ISO date
}

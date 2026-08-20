export type Customer = {
  id: string;
  name: string;
  phone?: string;
  notes?: string;
  openingBalance: number;
  createdAt: string;
};

export type Transaction = {
  id: string;
  customerId: string;
  note: string;
  amount: number;
  date: string;
  type: "credit" | "debit";
  createdAt: string;
};
import { z } from "zod";

export const transactionSchema = z.object({
  customerId: z.string().min(1, "Please select a customer"),
  note: z
    .string()
    .min(2, "Note must be at least 2 characters")
    .max(200, "Note is too long"),
  amount: z.coerce
    .number({ invalid_type_error: "Amount must be a number" })
    .positive("Amount must be greater than 0"),
  date: z.string().min(1, "Date is required"),
  type: z.enum(["credit", "debit"], {
    required_error: "Please select transaction type",
  }),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;
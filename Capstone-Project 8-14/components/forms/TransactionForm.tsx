"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  transactionSchema,
  type TransactionFormValues,
} from "@/lib/validators/transaction.schema";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { getCustomers } from "@/lib/mock/customers";

interface TransactionFormProps {
  onSubmit: (values: TransactionFormValues) => void;
  onCancel?: () => void;
  submitLabel?: string;
  defaultValues?: Partial<TransactionFormValues>;
}

export default function TransactionForm({
  onSubmit,
  onCancel,
  submitLabel = "Save transaction",
  defaultValues,
}: TransactionFormProps) {
  const customers = getCustomers();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      customerId: "",
      note: "",
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      type: "credit",
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Customer */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-ink-900">Customer</label>
        <select
          {...register("customerId")}
          className={`rounded-md border bg-paper-panel px-3 py-2 text-sm outline-none focus:border-ink-900 ${
            errors.customerId ? "border-debit" : "border-paper-rule"
          }`}
        >
          <option value="">Select customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.customerId && (
          <p className="text-xs text-debit">{errors.customerId.message}</p>
        )}
      </div>

      {/* Type */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-ink-900">Type</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" value="credit" {...register("type")} />
            <span className="text-credit">Credit (Money In)</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" value="debit" {...register("type")} />
            <span className="text-debit">Debit (Money Out)</span>
          </label>
        </div>
        {errors.type && (
          <p className="text-xs text-debit">{errors.type.message}</p>
        )}
      </div>

      {/* Amount */}
      <Input
        label="Amount (Rs)"
        type="number"
        step="1"
        placeholder="0"
        error={errors.amount?.message}
        {...register("amount")}
      />

      {/* Date */}
      <Input
        label="Date"
        type="date"
        error={errors.date?.message}
        {...register("date")}
      />

      {/* Note */}
      <Input
        label="Note"
        placeholder="e.g. Payment received for invoice #102"
        error={errors.note?.message}
        {...register("note")}
      />

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
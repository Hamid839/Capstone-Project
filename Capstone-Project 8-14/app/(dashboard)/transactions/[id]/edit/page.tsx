"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TransactionForm from "@/components/forms/TransactionForm";
import type { TransactionFormValues } from "@/lib/validators/transaction.schema";
import {
  getTransactionById,
  updateTransaction,
} from "@/lib/mock/customers";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function EditTransactionPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const transaction = getTransactionById(id);

  if (!transaction) {
    return (
      <div className="py-20 text-center">
        <p className="text-ink-400">Transaction not found</p>
        <Button className="mt-4" onClick={() => router.push("/transactions")}>
          Back to Transactions
        </Button>
      </div>
    );
  }

  const handleSubmit = (values: TransactionFormValues) => {
    updateTransaction(id, values);
    router.push("/transactions");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Breadcrumbs
        items={[
          { label: "Transactions", href: "/transactions" },
          { label: "Edit Transaction" },
        ]}
      />

      <Link
        href="/transactions"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink-400 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back to transactions
      </Link>

      <h1 className="text-2xl font-semibold text-ink-900">Edit Transaction</h1>
      <p className="mt-1 text-sm text-ink-400">Update the transaction details</p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Transaction details</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionForm
            onSubmit={handleSubmit}
            onCancel={() => router.push("/transactions")}
            submitLabel="Update transaction"
            defaultValues={{
              customerId: transaction.customerId,
              note: transaction.note,
              amount: Math.abs(transaction.amount),
              date: transaction.date,
              type: transaction.type,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
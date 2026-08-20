"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TransactionForm from "@/components/forms/TransactionForm";
import type { TransactionFormValues } from "@/lib/validators/transaction.schema";
import { addTransaction } from "@/lib/mock/customers";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export default function NewTransactionPage() {
  const router = useRouter();

  const handleSubmit = (values: TransactionFormValues) => {
    addTransaction(values);
    router.push("/transactions");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Breadcrumbs
        items={[
          { label: "Transactions", href: "/transactions" },
          { label: "Add Transaction" },
        ]}
      />

      <Link
        href="/transactions"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink-400 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back to transactions
      </Link>

      <h1 className="text-2xl font-semibold text-ink-900">Add Transaction</h1>
      <p className="mt-1 text-sm text-ink-400">
        Record a new credit or debit entry
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Transaction details</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionForm
            onSubmit={handleSubmit}
            onCancel={() => router.push("/transactions")}
            submitLabel="Add transaction"
          />
        </CardContent>
      </Card>
    </div>
  );
}
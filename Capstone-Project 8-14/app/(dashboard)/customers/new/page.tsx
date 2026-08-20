"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CustomerForm from "@/components/forms/CustomerForm";
import type { CustomerFormValues } from "@/lib/validators/customer.schema";
import { addCustomer } from "@/lib/mock/customers";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export default function NewCustomerPage() {
  const router = useRouter();

  const handleSubmit = (values: CustomerFormValues) => {
    addCustomer({
      name: values.name,
      phone: values.phone || undefined,
      openingBalance: values.openingBalance,
      notes: values.notes || undefined,
    });

    router.push("/customers");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Breadcrumbs
        items={[
          { label: "Customers", href: "/customers" },
          { label: "Add customer" },
        ]}
      />

      <Link
        href="/customers"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink-400 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back to customers
      </Link>

      <h1 className="text-2xl font-semibold text-ink-900">Add customer</h1>
      <p className="mt-1 text-sm text-ink-400">
        Create a new customer to start tracking their ledger.
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Customer details</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerForm
            onSubmit={handleSubmit}
            onCancel={() => router.push("/customers")}
            submitLabel="Add customer"
          />
        </CardContent>
      </Card>
    </div>
  );
}